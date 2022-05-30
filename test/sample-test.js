const { expect } = require("chai");
const { BigNumber } = require("ethers");
// const { ethers } = require("hardhat");

// describe("MainNFT", function () {
//   it("Test MainNFT", async function () {
//     const Hotel = await ethers.getContractFactory("HotelToken");
//     const hotel = await Hotel.deploy();
//     await hotel.deployed();

//     const name = await hotel.name();
//     const symbol = await hotel.symbol();

//     console.log("name", name);
//     console.log("symbol", symbol);

//     const tokenId = await hotel.create(hotel.address, "Shilla");
//     const hotelName = await hotel.getHotel((tokenId.value));

//     console.log("tokenId", parseInt(tokenId.value));
//     console.log("hotelName", hotelName);

//     const Booking = await ethers.getContractFactory("BookingToken");
//     const booking = await Booking.deploy();
//     await booking.deployed();

//     console.log("booking", booking.address);

//     const bToken = await hotel.airdrop(booking.address, booking.address);
//     const count = await booking.totalSupply();
//     console.log("bToken", bToken.value, count);

//     booking.burn(bToken.value);
//     const countAfterBurned = await booking.totalSupply();
//     console.log("bToken Count After burned", countAfterBurned);
//   });
// });

describe("Booking", function () {
  it("Test Booking Contract", async function () {
    
    const accounts = await ethers.getSigners();
    
    const MNFT = await ethers.getContractFactory("HotelToken");
    const mNFT = await MNFT.deploy();
    await mNFT.deployed();


    const name = await mNFT.name();
    const symbol = await mNFT.symbol();

    console.log("main nft name", name);
    console.log("main nft symbol", symbol);

    const hotel1_address = accounts[0].address;
    const hotel2_address = accounts[1].address;

    await mNFT.create(hotel1_address, "Shilla");
    await mNFT.create(hotel2_address, "Grant");

    const hotel1_name = await mNFT.getHotel(0);
    const hotel2_name = await mNFT.getHotel(1);

    console.log("hotel1: ", hotel1_name);
    console.log("hotel2: ", hotel2_name);

    const BNFT = await ethers.getContractFactory("BookingToken");
    const bNFT = await BNFT.deploy();
    await bNFT.deployed();

    const customer1 = accounts[2].address;
    const customer2 = accounts[3].address;

    await mNFT.airdrop(bNFT.address, customer1);
    await mNFT.airdrop(bNFT.address, customer2);

    const count = await bNFT.totalSupply();
    console.log("Booking NFT counts: ", parseInt(count));

    const Booking = await ethers.getContractFactory("Booking");
    const booking = await Booking.deploy();
    await booking.deployed();

    console.log("Main NFT: ", mNFT.address);
    console.log("Booking NFT :", bNFT.address);
    console.log("Booking Contract: ", booking.address);

    const now = Date.now();

    await booking.book(bNFT.address, mNFT.address, customer1, now, 0);
    await booking.book(bNFT.address, mNFT.address, customer2, now, 1);

    const booker1 = await booking.getBookData(mNFT.address, 0);
    const booker2 = await booking.getBookData(mNFT.address, 1);
 
    console.log("booker1", booker1);
    console.log("booker2", booker2);

    const count1 = await bNFT.totalSupply();
    console.log("bToken after booking", parseInt(count1));
  });
});

