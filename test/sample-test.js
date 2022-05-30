const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

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
    const MNFT = await ethers.getContractFactory("HotelToken");
    const mNFT = await MNFT.deploy();
    await mNFT.deployed();

    const name = await mNFT.name();
    const symbol = await mNFT.symbol();

    console.log("name", name);
    console.log("symbol", symbol);

    const tokenId = await mNFT.create(mNFT.address, "Shilla");
    const hotelName = await mNFT.getHotel((tokenId.value));

    console.log("tokenId", parseInt(tokenId.value));
    console.log("hotelName", hotelName);

    const BNFT = await ethers.getContractFactory("BookingToken");
    const bNFT = await BNFT.deploy();
    await bNFT.deployed();

    console.log("booking", bNFT.address);

    const bToken = await mNFT.airdrop(bNFT.address, bNFT.address);
    const count = await bNFT.totalSupply();
    console.log("bToken", count);

    const Booking = await ethers.getContractFactory("Booking");
    const booking = await Booking.deploy();
    await booking.deployed();

    await booking.book(bNFT.address, bNFT.address, mNFT.address, 0, bToken.value);
    console.log("hotel", mNFT.address);
    const booker = await booking.getBookData(mNFT.address, 0);
 
    console.log("booker", booker);
    const count1 = await bNFT.totalSupply();
    console.log("bToken after booking", count1);
  });
});

