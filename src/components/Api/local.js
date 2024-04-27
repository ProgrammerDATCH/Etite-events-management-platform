import { up, right, left } from '../assets';

const allUsers = [
    {
        id: 1,
        name: "Datch",
        email: "dev@gmail.com",
        password: "dev",
        phone: "0735177666"
    },
    {
        id: 2,
        name: "John",
        email: "john@gmail.com",
        password: "john",
        phone: "0735177661"
    },
];

const quiz = [
    {
      id: 1,
      question: 'Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:',
      options: ['Umuyobozi', 'Umuherekeza', 'A na B ni ibisubizo by’ukuri', 'Nta gisubizo cy’ukuri kirimo'],
      answerIndex: 2,
    },
    {
      id: 2,
      question: 'Ijambo “akayira” bivuga inzira nyabagendwa ifunganye yagenewe gusa:',
      options: ['Abanyamaguru', 'Ibinyabiziga bigendera ku biziga bibiri', 'A na B ni ibisubizo by’ukuri', 'Nta gisubizo cy’ukuri kirimo'],
      answerIndex: 2,
    },
    {
      id: 3,
      question: 'Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n’uturanga gukata tw’ibara ryera utwo turanga cyerekezo tumenyesha :',
      options: ['Igisate cy’umuhanda abayobozi bagomba gukurikira', 'Ahegereye umurongo ukomeje', 'Igabanurwa ry’umubare w’ibisate by’umuhanda mu cyerekezo bajyamo', 'A na C nibyo'],
      answerIndex: 2,
    },
    {
      id: 4,
      question: 'Ahantu ho kugendera mu muhanda herekanwa n’ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda :',
      options: ['Biteganye', 'Ku murongo umwe', 'A na B nibyo', 'Nta gisubizo cy’ukuri kirimo'],
      answerIndex: 2,
    },
  ];


  const courses = [
    { id: 1, title: 'Ikoni Ibumoso', image: left, description: '(Ahegereye Ikoni ryateza ibyago)' },
    { id: 2, title: 'Ikoni Iburyo', image: right, description: '(Ahegereye Ikoni ryateza Ibyago iburyo)' },
    // { id: 3, title: 'Umuhanda uterera cyane', image: up, description: 'Umuhanda uterera cyane' },
    // { id: 1, title: 'Ikoni Ibumoso', image: left, description: '(Ahegereye Ikoni ryateza ibyago)' },
    // { id: 2, title: 'Ikoni Iburyo', image: right, description: '(Ahegereye Ikoni ryateza Ibyago iburyo)' },
    // { id: 3, title: 'Umuhanda uterera cyane', image: up, description: 'Umuhanda uterera cyane' },
    // { id: 1, title: 'Ikoni Ibumoso', image: left, description: '(Ahegereye Ikoni ryateza ibyago)' },
    // { id: 2, title: 'Ikoni Iburyo', image: right, description: '(Ahegereye Ikoni ryateza Ibyago iburyo)' },
    // { id: 3, title: 'Umuhanda uterera cyane', image: up, description: 'Umuhanda uterera cyane' },
  ];


  const amategeko = [
    { id: 1, title: 'Umuhanda', description: 'Ni igice cy`inzira nyabagerwa kinyurwamo n`ibinyabiziga ikaba yagira imihanda myinshi.'},
    { id: 2, title: 'Igisate cy\'umuhanda', description: 'Kimwe mu bisate bigabanyije umuhanda mu burebure bwawo'},
    { id: 3, title: 'Isangano', description: 'Ahantu hose imihanda ihurira'},
  ];

export {allUsers, quiz, courses, amategeko};

