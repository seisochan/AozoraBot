'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Vtubers', [
      {
        name: 'epel',
        fullName: 'Evelyn Vtuber',
        fanName: 'Epelable',
        color: '0x5debeb',
        avatarURL:
          'https://yt3.ggpht.com/a/AATXAJxgPjxkVVGmmJBxMyajJqk57L9ySS4lBVqdEg=s288-c-k-c0xffffffff-no-rj-mo',
        channelURL: 'https://www.youtube.com/channel/UCMxxFFeuhFQ30quuePTym0A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'lily',
        fullName: 'Lily Ifeta',
        fanName: '',
        color: '0xccc4dd',
        avatarURL:
          'https://yt3.ggpht.com/a/AATXAJxT-ODi5IH_bXaburYZJWHmi8g7hHItlrdMRQs=s288-c-k-c0xffffffff-no-rj-mo',
        channelURL: 'https://www.youtube.com/channel/UCXSbl3XQYtx1u4Gvvca7NUA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'chloe',
        fullName: 'Chloe Pawapua',
        fanName: '',
        color: '0xbc9683',
        avatarURL:
          'https://yt3.ggpht.com/a/AATXAJw4rTpQdueS2iIqj5E15VHsETtyBOq61E7eDxyE=s288-c-k-c0xffffffff-no-rj-mo',
        channelURL: 'https://www.youtube.com/channel/UCrKS2bOUZDXA_R3qhCux7ow',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'reynard',
        fullName: 'Reynard Blanc',
        fanName: '',
        color: '0xb2b1ae',
        avatarURL:
          'https://yt3.ggpht.com/a/AATXAJwNG3J0zfMgMSOdfBsHkGl-ghKGVVdynSmF4UctIQ=s288-c-k-c0xffffffff-no-rj-mo',
        channelURL: 'https://www.youtube.com/channel/UCoUFv7APM1XOo4TUaWbRekw',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Vtubers', null, {});
  },
};
