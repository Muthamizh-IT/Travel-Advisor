const httpStatus = require('http-status');
const { Tourist } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

// let tourist = [
//   {
//     name: 'Ahmedabad',
//     info: 'A rapidly growing metropolis, an industrial hub, an educational hotspot, and a city with a magnificent past – Ahmedabad is one of the most important cities in Gujarat. Located on the banks of the Sabarmati River, Ahmedabad is the former capital of Gujarat, and its delicious food, colourful culture is making it a fast-growing tourist destination. The historic city of Ahmedabad or the old part of the city was declared as the UNESCO World Heritage Site.Home to a plethora of remarkable temples like Swaminarayan Temple, intriguing museums and classy markets, with a little bit of colonial history attached to it, Ahmedabad is an excellent example of how a city can still retain every bit of its old-world charm while still rapidly progressing on the path of globalisation.',
//     images: 'https://www.holidify.com/images/cmsuploads/compressed/Jama_Masjid_Ahmedabad_heritage_20190515120421.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Ahmedabad,+Gujarat/data=!4m2!3m1!1s0x395e848aba5bd449:0x4fcedd11614f6516?sa=X&ved=2ahUKEwiM-bWC84fmAhVSwjgGHQ1sCLQQ8gEwHXoECBwQBA',
//   },
//   {
//     name: 'Kutch',
//     info: 'Virtually an island that resembles the shape of a tortoise, Kutch is an erstwhile princely state of India holding onto its grandeur nature from the past.Kutch is probably one of the most beautiful, yet surreal places in India. With the vast expanses of white salt desert in the Rann of Kutch area, this is an amazing experience to witness. One would be able to see just stretches of pure white land as far as the eyesight goes. The place comes to life during the winters when the Rann Festival is held during December-February everywhere in which there are huge camp settlements with cultural programs, functions and adventure activities like hot-air ballooning. Kutch is also among the largest district of India with a terribly low population density.',
//     images: 'https://www.holidify.com/images/cmsuploads/compressed/Great_Rann_of_Kutch_20180205161526.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Kutch,+Gujarat/@23.7083639,68.8013806,8z/data=!3m1!4b1!4m5!3m4!1s0x39511e0750db4489:0x2049bf8ec25dea88!8m2!3d23.7337326!4d69.8597406',
//   },
//   {
//     name: 'Gir National Park',
//     info: 'Gir National Park is the only remaining home for the Asiatic Lions that are almost a definition to this park in Gujarat, which has a lot more to offerGir provides you with the unique experience of visiting a place which almost singularly plays a crucial and defining role in the preservation and sustaining of a certain species. The preservation of these lions was initiated by the Nawab of Junagadh when these were just about to enter the phase of extinction due to hunting. Official count said that there were 411 lions in 2010. Also, there are roughly different 2375 species of fauna here with 38 species of mammals, over 300 species of birds, 37 species of reptiles and over 2000 species of insects.',
//     images: 'https://www.holidify.com/images/bgImages/GIR-NATIONAL-PARK.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Gir+National+Park/@21.1329211,70.7843612,13z/data=!3m1!4b1!4m5!3m4!1s0x3be2bfc278812b53:0x3408d6d983464baf!8m2!3d21.1243054!4d70.8241507',
//   },
//   {
//     name: 'Somnath',
//     info: "Somnath, literally meaning 'lord of the moon' is a pilgrim center and is home to one of the 12 Jyotirlingas. It is a town which derives much of its identity from the mythology, religion, and legends that surround it.Primarily a temple town, Somnath is a place where a strong scent of religion and legends lingers around tourism and even daily life. Its spiritual environment is ornamented by the huge number of temples in the area, however, Somnath also offers beaches, museums and other attractions. While the Somnath temple and Somnath beach are the primary places to visit here, Gita Mandir, Balukha Tirtha, Kamnath Mahadev Temple, Somnath Museum are some of the other places that one can visit.",
//     images: 'https://www.holidify.com/images/bgImages/SOMNATH.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Somnath,+Gujarat/@20.9031968,70.3730104,14z/data=!3m1!4b1!4m5!3m4!1s0x3bfd328b9ce28aeb:0x6d2efaa0d9eda083!8m2!3d20.9060022!4d70.3843721',
//   },
//   {
//     name: 'Porbandar',
//     info: 'The birth place of Mahatma Gandhi, Porbandar is a beautiful beach town with some temples and dams, and is now also a popular trading hub.The coastal city with a significant event in its history is a tourist destination which modestly offers a number of attractions. Apart from the haveli where Gandhiji was born which has now been converted into a temple, there are a few more temples, dams, reservoirs, serene beaches and wildlife spots as well to add to your experience in Porbandar. It attracts pilgrims with temples such as the Sudama Mandir, Bharat Mandir, Ram Dhoon Mandir, Hanuman temple and more.',
//     images: 'https://www.holidify.com/images/cmsuploads/compressed/Hari_Mandir_Porbandar_20190116141529.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Porbandar,+Gujarat/@21.6354569,69.595266,13z/data=!3m1!4b1!4m5!3m4!1s0x3956345051c2f8e5:0x9e2165b8de9bd8ca!8m2!3d21.6416979!4d69.6293059',
//   },
//   {
//     name: 'Vadodara',
//     info: 'Vadodara or Baroda is a cosmopolitan city located in Gujarat. Home to some of the most exemplary displays of architecture, Vadodara is a fitting memorial to Maratha leader Sayaji Rao Gaekwad III who had envisioned a dream to make this Big City an educational, industrial and commercial centre.Known for one of the most lavish palaces in India- the Lakshmi Vilas Palace and plenty more legendary monuments, Vadodara is the cultural capital of Gujarat. ',
//     images: 'https://www.holidify.com/images/bgImages/VADODARA.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Vadodara,+Gujarat/@22.3220425,73.0329975,11z/data=!3m1!4b1!4m5!3m4!1s0x395fc8ab91a3ddab:0xac39d3bfe1473fb8!8m2!3d22.3071588!4d73.1812187',
//   },
//   {
//     name: 'Dwarka',
//     info: "Famous for having one of the 12 Jyotirlingas, Dwarka is best known as the home of Lord Krishna and will enchant you with the holiness that the air here carries. Located on the western tip of the Saurashtra peninsula in Gujarat, Dwarka is popularly known as the \"home of Lord Krishna\". The name Dwarka literally translates to dwar meaning 'door' and ka meaning 'moksha' meaning the ‘door to salvation. And so the aura of the religious town reverberates with spiritual holiness and chants of the devotees seeking moksha. Dwarka boasts of being the only city that is a part of both Char Dham (four principal holy places) and also Sapta Puris (seven holy cities) mentioned in the Hindu religion. For this reason, it enjoys a remarkable religious significance and attracts thousands of pilgrims all year round. In addition to this, the town is replete with grandeur temples, marvellous architecture and places of cultural significance. The beachside and the seashores are an added tourist attraction.",
//     images: 'https://www.holidify.com/images/bgImages/DWARKA.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Dwarka,+Gujarat/@22.2467142,68.9518839,14z/data=!3m1!4b1!4m5!3m4!1s0x39569c266399e37b:0xb5866e461a106e0a!8m2!3d22.2441975!4d68.9684562',
//   },
//   {
//     name: 'Junagadh',
//     info: 'Being the capital of Junagadh Princely State once, the town shines with historical significance with many historical monuments to see.Junagad is also very close to the Girnar Hills and the world renowned Gir National Park. Catch a glimpse of the wild in the Sakkabaug Zoo and the Wildlife Museum. Also visit the Girnar Hills and get a feel of the serene yet religious atmosphere. The fort at Uperkot is another tourist magnet.',
//     images: 'https://www.holidify.com/images/bgImages/JUNAGADH.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Junagadh,+Gujarat/@21.5305516,70.3675688,12z/data=!3m1!4b1!4m5!3m4!1s0x3958018c6a277f53:0x13b52f8520a86e48!8m2!3d21.5222203!4d70.4579436',
//   },
//   {
//     name: 'Gandhinagar',
//     info: "Gandhinagar, the capital city of Gujarat, is located at a distance of around 23 km from Ahmedabad on the western bank of Sabarmati river. Gandhinagar, one of India's few planned cities encompasses Akshardham Temple, one of the country's most beautiful temple. Gandhinagar offers a rich cultural heritage, beautiful temples and serene environment to all its visitors. Among other attractions are an enthralling Children's Park and uniquely built stepwell. The holy places in Gandhinagar like the Hanumanji Temple and the Brahmani Temple which in spite of not being so famous, are also worth visiting for an enriching experience.",
//     images: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Akshardham_Gandhinagar_Gujarat.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Gandhinagar,+Gujarat/@23.2206942,72.575507,12z/data=!3m1!4b1!4m5!3m4!1s0x395c2b987c6d6809:0xf86f06a7873e0391!8m2!3d23.2156354!4d72.6369415',
//   },
//   {
//     name: 'Diu',
//     info: "Located near the port of Veraval, Diu is a small island which was earlier a Portuguese colony, and is now guarded by beaches all around.The Diu Fort, a primary imprint of the Portuguese on the area's heritage and architecture makes up a popular tourist attraction. Another interesting place is the Vanakbara, a small fishing village whose charm has tints of colourful fishing boats and humming of day to day activity. This perfect add-on to a visit to Gujarat will complete your experience with interesting museums such as the Sea Shell Museum, temples and churches.",
//     images: 'https://www.holidify.com/images/cmsuploads/compressed/1024_20190430184549.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Diu,+Daman+and+Diu+362520/@20.7141776,70.9608083,14z/data=!3m1!4b1!4m5!3m4!1s0x3be31ce77c7a67bf:0x4664503a0396202!8m2!3d20.7144094!4d70.9873719',
//   },
//   {
//     name: 'Bhuj',
//     info: "A desert city with long history of kings and empires make Bhuj one of the most interesting and unique historical places to see.The city has a long history of kings and empires - and hence many historic places to see. The city was left in a state of devastation after the 2001 earthquake and is still in the recovery phase. Bhuj connects you to a range of civilizations and important events in South Asian history through prehistoric archaeological finds, remnants of the Indus Valley Civilization (Harappan), places associated with the Mahabharata and Alexander the Great's march into India and tombs, palaces and other buildings from the rule of the Naga chiefs, the Jadeja Rajputs, the Gujarat Sultans and the British Raj. ",
//     images: 'https://www.holidify.com/images/bgImages/BHUJ.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Bhuj,+Gujarat/@23.2507239,69.5988791,12z/data=!3m1!4b1!4m5!3m4!1s0x3950e209000b6f17:0x7077f358af0774a6!8m2!3d23.2419997!4d69.6669324',
//   },
//   {
//     name: 'Surat',
//     info: "Surat, having its name associated with Saurashtra (the good land), is a port city in Gujarat. The second most populated city in the state, Surat is a global diamond cutting centre and a commercial hub of textiles. Known as 'the city of flyovers', it attracts tourists who are interested in the colonial history of the region and the exotic wildlife.Packed on the south bank of a sharp bend in the Tapi River (Tapti), Surat is located 306 km south of the state capital, Gandhinagar. Once known for silk-weaving, it emerged as a major textile and diamond hub of India, with the shops in the New Textile Market area often crowded with buyers and shoppers. Prominent tourist attractions in Surat are the Surat Castle, Science Centre Complex and the Diamond Gallery among others.",
//     images:
//       'https://www.holidify.com/images/cmsuploads/compressed/17192531_1054548924649434_1507851808365750554_o_20180329163703.jpg',
//     location:
//       'https://www.google.co.in/maps/place/Surat,+Gujarat/@21.1591425,72.6822074,11z/data=!3m1!4b1!4m5!3m4!1s0x3be04e59411d1563:0xfe4558290938b042!8m2!3d21.1702401!4d72.8310607',
//   },
// ];

const createTourist = async () => {
  // tourist.forEach(async (e) => {
  //   await Tourist.create({
  //     locationId: 'b813c8ef-7e7e-4a2a-a318-55bf8de1ec14',
  //     stateId: '70e2f42e-7c30-4039-8876-204228e2aa9b',
  //     name: e.name,
  //     info: e.info,
  //     img: e.images,
  //     location: e.location,
  //     created: moment(),
  //   });
  // });
  return { message: 'Mooditu podaaaa' };
};

const getAllTourist = async () => {
  let values = await Tourist.find({ active: true });
  return values;
};

const gettouristById = async (id) => {
  let values = await Tourist.findOne({ _id: id, active: true });
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Tourist Found');
  }
  return values;
};

const updateTouristById = async (id, updateBody) => {
  let tourist = await Tourist.findOne({ _id: id, active: true });
  if (!tourist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tourist Not Available');
  }
  tourist = await Tourist.findByIdAndUpdate({ _id: id }, { updateBody }, { new: true });
  return tourist;
};

// fetch Top Five Places

const get_Top_Five_places = async () => {
  const data = await Tourist.aggregate([
    {
      $match: {
        topfive: true,
      },
    },
    {
      $lookup: {
        from: 'states',
        localField: 'stateId',
        foreignField: '_id',
        as: 'State',
      },
    },
    {
      $unwind: '$State',
    },
    {
      $project: {
        _id: 1,
        stateId: 1,
        name: 1,
        info: 1,
        img: 1,
        location: 1,
        topfive: 1,
        StateName: '$State.name',
        StateHistory: '$State.history',
      },
    },
  ]);
  return data;
};

module.exports = {
  createTourist,
  getAllTourist,
  gettouristById,
  updateTouristById,
  get_Top_Five_places,
};
