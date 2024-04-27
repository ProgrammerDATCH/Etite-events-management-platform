import { FaInstagram, FaFacebook } from 'react-icons/fa';

const webInfo = {
    webName: "Etite Event Management Platform",
    webLink: "",
    webOwner: "Etite",
    webDeveloper: "Programmer DATCH",
    webDeveloperLink: "https://programmerdatch.netlify.com/",
}

const navigationMenu = [
    { name: 'Home', href: '/', current: false },
    { name: 'Events', href: '/events', current: false },
  ];

const myLinks = {
    web: "https://programmerdatch.000webhostapp.com/",
    ig: "https://www.instagram.com/programmerdatch/",
    linkedin: "https://www.linkedin.com/in/programmerdatch/",
    github: "https://github.com/ProgrammerDATCH",
    youtube: "https://www.youtube.com/@ProgrammerDATCH",
    twitter: "https://twitter.com/ProgrammerDATCH",
    whatsapp: "https://wa.me/+250735177666",
    whatsappJob: "https://wa.me/+250735177666?text=Greetings%20Programmer%20DATCH%2C%0A%0AI%20discovered%20your%20portfolio%20and%20I%27m%20interested%20in%20offering%20you%20a%20coding%20opportunity%20for%20my%20project.",
    facebook: "https://www.facebook.com/profile.php?id=100068532707087",
    email: "mailto:programmerdatch@gmail.com",
    tiktok: "https://tiktok.com/@programmerdatch",
    play: "https://play.google.com/store/apps/dev?id=7881383766588193746",
    telegram: "https://t.me/programmerdatch",
    snap: "https://www.snapchat.com/add/datch1502?share_id=NZq-VlCB6p4&locale=en-US",
    call: "tel:+250735177666"
};

const socialMediaLinks = [
    {
        name: "Instagram",
        link: myLinks.ig,
        icon: FaInstagram
    },
    {
        name: "Facebook",
        link: myLinks.facebook,
        icon: FaFacebook
    }
    
];

const blurhashImg = "LDD?Kkj[K5jZ2[ay2YbH|HfQN[a|";

export {
    navigationMenu,
    webInfo,
    myLinks,
    socialMediaLinks,
    blurhashImg,
};