const initialState = {
  projects: {
    src: [
      {
        name: 'Interactive Video Maker',
        short: 'My entry for Vanhackathon 2019',
        long: 'This is the longer description',
        technologies: ['HTML/CSS', 'ReactJS'],
        repo: 'https://github.com/t0mclaudio/vanhackathon-thinkific-1',
        demo: 'https://create-your-own-adventure-01.netlify.com/',
        img: 'vanhack.png',
        type: 'personal project',
        post_date: 'October 2019',
      },
      {
        name: 'Dev Portfolio Site',
        short: 'My developer portfolio site',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'ReactJS', 'Redux'],
        repo: 'https://github.com/t0mclaudio/t0mclaudio.github.io',
        demo: 'https://t0mclaudio.github.io/',
        img: 'vanhack.png',
        type: 'personal project',
        post_date: 'November 2019',
      },
      {
        name: 'Etours Static Website',
        short: 'Etours generated static site using custom static generator',
        long: 'This is the longer description',
        technologies: ['Python', 'Flask', 'HTML', 'CSS', 'Javascript'],
        demo: 'www.etours.ph',
        img: 'etours_new.png',
      },
      {
        name: 'Pricing-Booking Widget',
        short: 'A pricing booking widget for Etours website',
        long: 'This is the longer description',
        technologies: ['ReactJS', 'Firebase'],
        repo: 'the repository link',
        demo: 'https://www.etours.ph/tourpackage/philippines-davao-city-shopping-tour.html',
        img: 'etours_new.png',
      },
      {
        name: 'Etours Content Management System',
        short: 'Content management system for Etours tour product',
        long: 'This is the longer description',
        technologies: ['Python', 'Django', 'Sass', 'HTML', 'CSS'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'etours_new.png',
      },
      {
        name: 'El Don Resort Website',
        short: 'El Don Resort Website',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'Javascript'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'eldon.jpg',
      },
      {
        name: 'Equator Asia Portfolio',
        short: 'A content management system for BIMP EAGA country portfolio',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'Python', 'Django', 'ReactJS'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'equatorasia.png',
      },
      {
        name: 'Etours Website v3',
        short: 'Etours website',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'Javascript'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'etours_old.jpg',
      },
      {
        name: 'Fresh Studio Website',
        short: 'Fresh Studio Innovations Asia Website',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'Php', 'Joomla', 'Javascript'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'fs.jpg',
      },
      {
        name: 'NEH Website',
        short: 'NEH Website Website',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'Javascript', 'Php', 'Joomla'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'neh.jpg',
      },
      {
        name: 'FS Dakado Website',
        short: 'Fresh Studion Vietnam Dakado Website',
        long: 'This is the longer description',
        technologies: ['HTML', 'CSS', 'Javascript', 'Php', 'Joomla'],
        repo: 'the repository link',
        demo: 'demo link',
        img: 'fs.jpg',
      },
    ],
    filtered: [],
    filters: [],
    technologies: [],
  },
  technologies: ['ReactJS', 'Redux', 'Django', 'Python', 'Vue', 'Flask', 'HTML/CSS'],
};

initialState.projects.filtered = initialState.projects.src;
const technologies = [];
initialState.projects.src.forEach((proj) => {
  proj.technologies.forEach((item) => {
    if (!technologies.includes(item)) {
      technologies.push(item);
    }
  });
});

initialState.technologies = technologies.sort();
export default initialState;
