angular.module('starter.services', [])

.service('TauliahService', function($http) {
  

  var senarai_tauliah = [];

  return {
    getSenaraiTauliah : function(nama)
    {
      return $http.get('http://etauliah2.jais.gov.my/list/listpemohonapi?nama='+nama)
       .then(function (response) {        
         senarai_tauliah = response.data;
         return response.data;
       });
    },
    getTauliah : function(tauliahId)
    {
      return senarai_tauliah[tauliahId];
    }
  };

})

.service('DaftarTauliahService', function($http,$httpParamSerializerJQLike) {

  var maklumat_pemohon = [];

  var auth_header = {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                    };

  return {
    searchICPemohon : function(ic)
    {
      var api_url = 'http://etauliah2.jais.gov.my/apply/checkicapi?icno='+ic;

      var test_url = 'http://simplephp.dev/checkICAPI.php?icno='+ic;

      return $http.get(test_url)
       .then(function (response) {        
         maklumat_pemohon = response.data;
         return response.data;
       });

    },
    getDaftarTauliah : function()
    {
      return maklumat_pemohon;
    },
    submitMaklumatPemohon : function(data)
    {
      var form_data = $httpParamSerializerJQLike(data);

      console.log(form_data);

      return $http({
        method : 'POST',
        data : form_data,
        url : 'http://etauliah2.jais.gov.my/apply/updateapi',
        headers : auth_header
        });
    }
  };

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
