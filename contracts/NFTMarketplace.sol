//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable owner;

    address burnAddress = 0x000000000000000000000000000000000000dEaD;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        uint256 price;
        uint256 promptPrice;
        address[] promptBuyer;
        bool hidden;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        uint256 price,
        uint256 promptPrice,
        address[] promptBuyer
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    // This mapping maps bridged tokenId to token info
    uint256[] private bridgedIds;

    //This mapping maps user to owned prompts
    mapping(address => uint256[]) private userToOwnedPrompts;

    constructor() ERC721("AIChillMarketplace", "AIC") {
        owner = payable(msg.sender);
    }

    function getLatestIdToListedToken()
        public
        view
        returns (ListedToken memory)
    {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(
        uint256 tokenId
    ) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getCurrentPromptBuyer(
        uint256 tokenId
    ) public view returns (address[] memory) {
        ListedToken memory item = idToListedToken[tokenId];
        return item.promptBuyer;
    }

    function getCurrentPromptPrice(
        uint256 tokenId
    ) public view returns (uint256) {
        ListedToken memory item = idToListedToken[tokenId];
        return item.promptPrice;
    }

    //The first time a token is created, it is listed here
    function createToken(
        string memory tokenURI,
        uint256 price,
        uint256 promptPrice
    ) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        address[] memory promptBuyer;

        uint tokenId = uint256(_tokenIds._value);
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(msg.sender),
            price,
            promptPrice,
            promptBuyer,
            false
        );
        idToListedToken[tokenId].promptBuyer.push(msg.sender);

        if (price > 0) {
            _transfer(msg.sender, address(this), tokenId);
        }

        userToOwnedPrompts[msg.sender].push(tokenId);

        return newTokenId;
    }

    function updateTokenPrice(
        uint256 tokenId,
        uint256 price
    ) private returns (uint) {
        // check if the caller is the owner of the NFT
        ListedToken memory item = idToListedToken[tokenId];
        require(msg.sender == item.owner, "Permission Denied");

        if (price == 0 && item.price != 0) {
            idToListedToken[tokenId].price = price;
            _transfer(address(this), msg.sender, tokenId);
            return tokenId;
        }

        if (price == 0 && item.price == 0) {
            return tokenId;
        }

        if (price != 0 && item.price == 0) {
            _transfer(msg.sender, address(this), tokenId);
            idToListedToken[tokenId].price = price;
            return tokenId;
        }

        if (price != 0 && item.price != 0) {
            idToListedToken[tokenId].price = price;
            return tokenId;
        }
    }

    function updateTokenPrices(
        uint256[] calldata tokenIds,
        uint256 price
    ) public payable {
        for (uint i = 0; i < tokenIds.length; i++) {
            updateTokenPrice(tokenIds[i], price);
        }
    }

    function updatePromptPrice(
        uint256 tokenId,
        uint256 newPromptPrice
    ) private returns (uint) {
        // check if the caller is the owner of the NFT
        require(
            msg.sender == idToListedToken[tokenId].owner,
            "Permission Denied"
        );

        idToListedToken[tokenId].promptPrice = newPromptPrice;

        return tokenId;
    }

    function updatePromptPrices(
        uint256[] calldata tokenIds,
        uint256 newPromptPrice
    ) public payable {
        for (uint i = 0; i < tokenIds.length; i++) {
            updatePromptPrice(tokenIds[i], newPromptPrice);
        }
    }

    function buyPrompt(uint256 tokenId) public payable returns (uint) {
        uint256 promptPrice = idToListedToken[tokenId].promptPrice;

        // sanity check
        require(promptPrice != 0, "Prompt is not buyable");
        require(
            msg.value == promptPrice,
            "Please submit the asking Prompt price in order to complete the purchase"
        );

        idToListedToken[tokenId].promptBuyer.push(msg.sender);
        userToOwnedPrompts[msg.sender].push(tokenId);

        //Transfer the proceeds from the Prompt sale to the seller of the NFT
        payable(idToListedToken[tokenId].owner).transfer(msg.value);

        return tokenId;
    }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;

        // Count the NFTs owned by the caller
        for (uint i = 1; i <= totalItemCount; i++) {
            if (idToListedToken[i].hidden == false) {
                itemCount++;
            }
        }

        // Create an array to store the caller's NFTs
        ListedToken[] memory items = new ListedToken[](itemCount);
        uint currentId = 0;
        for (uint i = 1; i <= totalItemCount; i++) {
            if (idToListedToken[i].hidden == false) {
                items[currentId] = idToListedToken[i];
                currentId++;
            }
        }
        //the array 'items' has the list of all NFTs in the marketplace
        return items;
    }

    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;

        // Count the NFTs owned by the caller
        for (uint i = 1; i <= totalItemCount; i++) {
            if (
                idToListedToken[i].owner == msg.sender &&
                idToListedToken[i].hidden == false
            ) {
                itemCount++;
            }
        }

        // Create an array to store the caller's NFTs
        ListedToken[] memory items = new ListedToken[](itemCount);

        // Populate the array with the caller's NFTs
        uint currentIndex = 0;
        for (uint i = 1; i <= totalItemCount; i++) {
            if (
                idToListedToken[i].owner == msg.sender &&
                idToListedToken[i].hidden == false
            ) {
                items[currentIndex] = idToListedToken[i];
                currentIndex++;
            }
        }

        return items;
    }

    function getNFTsFromAddress(
        address addr
    ) public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;

        // Count the NFTs owned by the caller
        for (uint i = 1; i <= totalItemCount; i++) {
            if (
                idToListedToken[i].owner == addr &&
                idToListedToken[i].hidden == false
            ) {
                itemCount++;
            }
        }

        // Create an array to store the caller's NFTs
        ListedToken[] memory items = new ListedToken[](itemCount);

        // Populate the array with the caller's NFTs
        uint currentIndex = 0;
        for (uint i = 1; i <= totalItemCount; i++) {
            if (
                idToListedToken[i].owner == addr &&
                idToListedToken[i].hidden == false
            ) {
                items[currentIndex] = idToListedToken[i];
                currentIndex++;
            }
        }

        return items;
    }

    //Return all the NFTs that the current user is the owner of their prompts
    function getMyPrompts() public view returns (ListedToken[] memory) {
        uint totalItemCount = userToOwnedPrompts[msg.sender].length;

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](totalItemCount);
        uint currentIndex;
        for (uint i = 0; i < totalItemCount; i++) {
            uint currentId = userToOwnedPrompts[msg.sender][i];
            ListedToken storage currentItem = idToListedToken[currentId];
            if (currentItem.hidden == false) {
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function getNFTById(uint256 id) public view returns (ListedToken memory) {
        return idToListedToken[id];
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(price != 0, "The NFT is not for sale");

        address owner = idToListedToken[tokenId].owner;

        //update the details of the token
        idToListedToken[tokenId].owner = payable(msg.sender);
        idToListedToken[tokenId].promptBuyer.push(msg.sender);
        userToOwnedPrompts[msg.sender].push(tokenId);

        _itemsSold.increment();

        idToListedToken[tokenId].price = 0;
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(msg.value);
    }

    function transferNFT(uint256 tokenId, address to) private {
        require(
            msg.sender == idToListedToken[tokenId].owner,
            "Permission Denied"
        );

        idToListedToken[tokenId].owner = payable(to);
        idToListedToken[tokenId].promptBuyer.push(msg.sender);
        userToOwnedPrompts[to].push(tokenId);

        if (idToListedToken[tokenId].price != 0) {
            idToListedToken[tokenId].price = 0;
            _transfer(address(this), to, tokenId);
        } else {
            _transfer(msg.sender, to, tokenId);
        }
    }

    function transferNFTs(uint256[] memory tokenIds, address to) public {
        for (uint i = 0; i < tokenIds.length; i++) {
            transferNFT(tokenIds[i], to);
        }
    }

    function withdrawNFTs(uint256[] memory tokenIds, address to) public {
        for (uint i = 0; i < tokenIds.length; i++) {
            transferNFT(tokenIds[i], to);
            idToListedToken[i].hidden = true;
        }
    }

    function bridgeNFT(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);

        _setTokenURI(newTokenId, tokenURI);

        address[] memory promptBuyer;

        uint tokenId = uint256(_tokenIds._value);
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(msg.sender),
            0,
            0,
            promptBuyer,
            false
        );
        idToListedToken[tokenId].promptBuyer.push(msg.sender);

        userToOwnedPrompts[msg.sender].push(tokenId);
        bridgedIds.push(tokenId);

        return newTokenId;
    }

    function burnBridgedToken(uint256 tokenId) public {
        // check if the caller is the owner of the NFT
        require(
            msg.sender == idToListedToken[tokenId].owner,
            "Permission Denied"
        );
        for (uint i = 0; i < bridgedIds.length; i++) {
            if (tokenId == bridgedIds[i]) {
                idToListedToken[tokenId].hidden = true;
                _transfer(msg.sender, burnAddress, tokenId);
            }
        }
    }
}
