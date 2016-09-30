angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

// Tauliah Controller

.controller('TauliahCtrl', function($scope, TauliahService, $ionicLoading) {
  
  $scope.data = {};
  $scope.senarai_tauliah = [];

  $scope.searchTauliah = function()
  {
    if ($scope.data.namaPemohon!=null) {

      //show loading 
      $ionicLoading.show({
        template: 'Loading...',
        noBackdrop:true
      });

      TauliahService.getSenaraiTauliah($scope.data.namaPemohon)
       .then(function(response) {
         
         // hide loading before show the data
         $ionicLoading.hide({
          template: 'Loading...'
         });

         $scope.senarai_tauliah = response;
      });

    }
    else{

    };
    
  };

  
  
})

// end of tauliah controller

// TauliahDetailCtrl

.controller('TauliahDetailCtrl', function($scope, $stateParams, TauliahService) {
  $scope.tauliah = TauliahService.getTauliah($stateParams.tauliahId);
})

//end of TauliahDetailCtrl

// Tauliah Controller

.controller('DaftarTauliahCtrl', function($scope, DaftarTauliahService, $ionicLoading, $state) {
  
  $scope.data = {};

  $scope.searchICPemohon = function()
  {
    if ($scope.data.icPemohon!=null) {

      //show loading 
      $ionicLoading.show({
        template: 'Loading...',
        noBackdrop:true
      });

      //810101105657

      DaftarTauliahService.searchICPemohon($scope.data.icPemohon)
       .then(function(response) {
         
         // hide loading before show the data
         $ionicLoading.hide({
          template: 'Loading...'
         });

         // console.log(response);

         //redirect to daftarTauliahdetail

         $state.go('tab.daftartauliah-detail', {}, { reload: true });

      });

    }
    else{
      //ask the user to enter ic
    };
    
  };
  
})

// end of tauliah controller

// DaftarTauliahDetailCtrl

.controller('DaftarTauliahDetailCtrl', function($scope, $stateParams, DaftarTauliahService, $ionicLoading) {

  $scope.daftartauliahDetail = DaftarTauliahService.getDaftarTauliah();

  //determine if new form or update form

  $scope.new_form = 'Y';

  if (angular.isDefined($scope.daftartauliahDetail.Icnob)) {
    $scope.new_form = 'N';
  };

  //set default value on form fields based on the existing data from API

  $scope.data = {
    nama_pemohon : $scope.daftartauliahDetail.NmPemohon,
    icno : $scope.daftartauliahDetail.Icnob,
    email : $scope.daftartauliahDetail.EmailAdd,
    no_tel : $scope.daftartauliahDetail.TelHp,
    postcode : $scope.daftartauliahDetail.PscdHome,
  };

  // console.log($scope.daftartauliahDetail);

  //update maklumat pemohon

  $scope.updateMaklumatPemohon = function()
  {
    //show loading 
      $ionicLoading.show({
        template: 'Loading...',
        noBackdrop:true
      });

      DaftarTauliahService.submitMaklumatPemohon($scope.data)
       .then(function(response) {
         
         // hide loading before show the data
         $ionicLoading.hide({
          template: 'Loading...'
         });

         console.log(response);

         alert('berjaya');
      });
  }


})

//end of DaftarTauliahDetailCtrl

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
