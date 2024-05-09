import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Albums from './models/Albums';
import Artists from './models/Artists';
import albums from './routes/albums';
import Tracks from './models/Tracks';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try{
    await  db.dropCollection('albums');
    await  db.dropCollection('artists');
    await  db.dropCollection('trackhistories');
    await  db.dropCollection('tracks');
    await  db.dropCollection('users');
  }catch (e) {
    console.log('Collections were not present, skipping drop...')
  }

  await User.create({
    username: 'user',
    password: '123',
    token: crypto.randomUUID(),
    role: 'listener'
  },
    {
      username: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin'
  })

  const [stingArtists, WhitneyArtists]= await Artists.create({
    name: 'Sting',
    image: 'images/sting.jpeg',
    info: 'Го́рдон Мэ́ттью То́мас Са́мнер, более известный под псевдонимом Стинг — английский музыкант-мультиинструменталист, певец и автор песен, актёр, общественный деятель и филантроп. Вокалист группы The Police в 1976—1984 годах. С 1984 года — сольный исполнитель.',
  },{
    name: 'Whitney Elizabeth Houston',
    image: 'images/whitney.jpeg',
    info: 'Уи́тни Эли́забет Хью́стон — американская актриса кино и телевидения, поп-, соул- и ритм-энд-блюзовая певица, продюсер и фотомодель. Одна из самых коммерчески успешных исполнительниц в истории мировой музыки.',
    });

  const [SummonerAlbums, BringAlbums, loveAlbums, iLookAlbums] = await Albums.create({
    name: 'Ten Summoner’s Tales',
    date: 1993,
    image: 'images/summoner.jpeg',
    singer: stingArtists._id,
  },{
    name: 'Bring on the Night',
    date: 1986,
    image: 'images/Bring on the night.jpeg',
    singer: stingArtists._id,
  }, {
     name: 'My Love Is Your Love',
     date: 1998,
     image: 'images/my love is.jpeg',
    singer: WhitneyArtists._id,
  }, {
      name: 'I Look to You',
      date: 2009,
      image: 'images/Ilook to you.jpeg',
      singer: WhitneyArtists._id,
    });

  await Tracks.create({
    name: 'If I Ever Lose My Faith in You',
    duration: '4:30',
    sequence: 1,
    album: SummonerAlbums._id
  }, {
    name: 'Love Is Stronger Than Justice (The Munificent Seven)',
    duration: '5:11',
    sequence: 2,
    album: SummonerAlbums._id
  },{
    name: 'Fields of Gold',
    duration: '3:42',
    sequence: 3,
    album: SummonerAlbums._id
  },{
    name: 'Heavy Cloud No Rain',
    duration: '3:39',
    sequence: 4,
    album: SummonerAlbums._id
  },{
    name: 'She’s Too Good for Me',
    duration: '2:30',
    sequence: 6,
    album: SummonerAlbums._id
  },{
    name: 'Bring on the Night/When the World Is Running Down You Make the Best of What’s Still Around',
    duration: '11:41',
    sequence: 1,
    album: BringAlbums._id
  },{
    name: 'Consider Me Gone',
    duration: '4:53',
    sequence: 2,
    album: BringAlbums._id
  },{
    name: 'Low Life',
    duration: '4:03',
    sequence: 3,
    album: BringAlbums._id
  },{
    name: 'We Work the Black Seam',
    duration: '6:55',
    sequence: 4,
    album: BringAlbums._id
  },{
    name: 'Driven to Tears',
    duration: '6.59',
    sequence: 5,
    album: BringAlbums._id
  }, {
    name: 'It’s Not Right, But It’s Okay',
    duration: '4:52',
    sequence: 1,
    album: loveAlbums._id
  },{
    name: 'Heartbreak Hotel',
    duration: '4:41',
    sequence: 2,
    album: loveAlbums._id
  },{
    name: 'My Love Is Your Love',
    duration: '4:20',
    sequence: 3,
    album: loveAlbums._id
  },{
    name: 'When You Believe',
    duration: '4:20',
    sequence: 4,
    album: loveAlbums._id
  },{
    name: 'If I Told You That',
    duration: '4:37',
    sequence: 5,
    album: loveAlbums._id
  },{
    name: 'It’s Not Right, But It’s Okay',
    duration: '4:52',
    sequence: 1,
    album: iLookAlbums._id
  },{
    name: 'Heartbreak Hotel',
    duration: '4:52',
    sequence: 2,
    album: iLookAlbums._id
  },{
    name: 'My Love Is Your Love',
    duration: '4:03',
    sequence: 3,
    album: iLookAlbums._id
  },{
    name: 'When You Believe',
    duration: '4:32',
    sequence: 4,
    album: iLookAlbums._id
  },{
    name: 'If I Told You That',
    duration: '4:37',
    sequence: 5,
    album: iLookAlbums._id
  });

  await db.close();
  };

run().catch(console.error);

