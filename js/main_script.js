var index = function(){

	function start(reload){
		load_youtube(reload);
		carousel();
		if(!reload){
			check_if_logged(false);
			remove_preloader();
		}
	}

	function listen_for_login(){
		//document.getElementById('login').addEventListener("click", display_login_form);
	}

	function remove_preloader(){
		jQuery('.preloader').css('opacity', '0');
		setInterval(function(){
			$( ".preloader" ).remove();
		},2000);

		$("#ytplayer")[0].src += "&autoplay=0";
		ev.preventDefault();
	}

	function carousel(){
		var owl = $('.owl-carousel');
		var owl2 = $('.owly-2');

		owl.owlCarousel({
			loop:true,
			items:1,
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoPlaySpeed: 500,
			autoplayHoverPause:false
		});

		owl2.owlCarousel({
			loop:true,
			items:1,
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoPlaySpeed: 500,
			autoplayHoverPause:false
		});
	}

	function load_youtube(reload){
		// Replace the 'ytplayer' element with an <iframe> and
		// YouTube player after the API code downloads.
		window.onYouTubePlayerAPIReady = function() {
			var player = new YT.Player('ytplayer', {
				height: '272',
				width: '100%',
				videoId: 'M7lc1UVf-VE'
			});

			var player2 = new YT.Player('ytplayer-2', {
				height: '270',
				width: '100%',
				videoId: 'gdx7gN1UyX0'
			});
		}

		// Load the IFrame Player API code asynchronously.
		if(!reload){
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			onYouTubePlayerAPIReady();
		}
	}

	function myMap() {
		var mapOptions = {
			center: new google.maps.LatLng(51.5, -0.12),
			zoom: 10
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}

	function display_login_form(){
		swal({
			title: 'Iniciar Sesión',
			html:
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<label class="ico" for="correo_input"><i class="fa fa-envelope-o" aria-hidden="true" style="position: absolute;left: 2px;padding-top: 8px;top: 23px;'+
				'width: 55px;height: 50px;font-size: 30px;background: #f3f4f5;color: #c0c3c5;text-align: center;border-radius: 2px 0 0 2px;"></i></label>'+
				'<input autofocus="autofocus" class="form-control" id="correo_input" placeholder="Correo" type="email" value="" '+
				'style="box-shadow: none;padding: 0 20px 0 71px;font-size: 16px;line-height: 20px;color: #777f81;font-weight: bold;height: 54px;width: 100%;'+
				'border: 2px solid #dbdddd;background: #fff;"></div></div>'+
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<label class="ico" for="pass_input"><i class="fa fa-lock" aria-hidden="true" style="position: absolute;left: 2px;padding-top: 8px;top: 23px;'+
				'width: 55px;height: 50px;font-size: 30px;background: #f3f4f5;color: #c0c3c5;text-align: center;border-radius: 2px 0 0 2px;"></i></label>'+
				'<input autofocus="autofocus" class="form-control" id="pass_input" placeholder="Contraseña" type="password" value="" '+
				'style="box-shadow: none;padding: 0 20px 0 71px;font-size: 16px;line-height: 20px;color: #777f81;font-weight: bold;height: 54px;width: 100%;'+
				'border: 2px solid #dbdddd;background: #fff;"></div></div>'+
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<input type="button" value="Entrar" id="login_button_form" style="background-color: #037EF3;color: #fff;padding: 10px;border-radius:0;"></div></div>'+
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<input type="button" value="Cancelar" onclick="swal.close();" style="background-color: #DD1C1A;color: #fff;padding: 10px;border-radius:0;"></div></div>',
			showCloseButton:false,
			showCancelButton:false,
			showConfirmButton:false,
			allowOutsideClick:false,
			allowEscapeKey:true
		});
		document.getElementById('login_button_form').addEventListener("click", function(){
			iniciar_sesion();
		});
		document.getElementById('correo_input').addEventListener("keyup", function(e){
			if(e.code==='Enter'){
				iniciar_sesion();
			}
		});
		document.getElementById('pass_input').addEventListener("keyup", function(e){
			if(e.code==='Enter'){
				iniciar_sesion();
			}
		});
		function iniciar_sesion(){
			var correo = document.getElementById('correo_input').value;
			var pass = document.getElementById('pass_input').value;
			ajax('POST','get_token.php','correo='+correo+'&pass='+pass,function(result){
				try{
					var obj = JSON.parse(result);
					if(obj.status==='ok'){
						document.cookie = "expa_token="+obj.token+"; path=/; expires="+return_date_for_cookie();
						check_if_logged(false);
						swal.close();
					}
				}catch(error){
					console.log(error);
				}
			},function(error){
				console.log(error);
			},0);
		}
		function return_date_for_cookie(){
			function return_day(day){
				var obj = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
				return obj[day];
			}
			function return_month(month){
				var obj = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
				return obj[month];
			}
			var d1 = new Date();
			var d = new Date(d1.getTime()+172800000);
			return return_day(d.getDay())+", "+cero(d.getDate())+" "+return_month(d.getMonth())+" "+d.getFullYear()+" 00:00:00 GMT;";
		}
	}

	function cero(n){
		return (n.toString().length===1)? '0'+n : n;
	}

	function check_if_logged(cookie_erased){
		var token = obtenerCookie('expa_token');
		if(token!=='' && !cookie_erased){
			ajax('GET','https://gis-api.aiesec.org/v2/current_person.json?access_token='+token,'',function(result){
				try{
					var obj = JSON.parse(result);
					document.getElementById('login').removeEventListener("click", display_login_form);
					console.log(obj);
				} catch(error){
					console.log(error);
				}
			},function(error){
				console.log(error);
			},0);
		} else {
			listen_for_login();
		}
	}

	function obtenerCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	}

	function ajax(type,url,data,callback,error,files,content_type) {
		var r = new XMLHttpRequest();
		r.open(type, url, true);
		if (!files) {
			var ct = (content_type!==undefined) ? content_type : 'application/x-www-form-urlencoded';
			r.setRequestHeader("Content-type", ct);
		}
		r.onload = function() {
			if (r.status >= 200 && r.status < 400) {
				callback(r.responseText);
			} else {
				error("Ha ocurrido un error");
			}
		};
		r.onerror = function() {
			error("Ha ocurrido un error");
		};
		try{
			if (type==="POST") {
				r.send(data);
			} else if (type==="GET") {
				r.send();
			}
		} catch(e){
			error("Ha ocurrido un error");
		}
	}

	return{
		start:start,
		myMap:myMap,
		ajax:ajax,
		cero:cero,
		check_if_logged:check_if_logged,
		obtenerCookie:obtenerCookie
	}
}();

var busqueda_ogv = function(){
	function start(reload){
		init_angular();
		if(!reload){
			index.check_if_logged(false);
		}
		carousel();
		lazyload();
		nose();
	}

	function lazyload(id_picture){
		if (id_picture) {
			load_image(id_picture+"_lazyload",document.getElementById(id_picture).dataset.lazyload,document.getElementById(id_picture),true);
		} else {
			var imgs = document.getElementsByClassName('lazyload');
			var numero = imgs.length;
			for(var i = 0; i < numero; i++) {
				var src = imgs[i].dataset.lazyload;
				if (src) {
					load_image(i+"_lazyload",src,imgs[i],(i===(numero-1)));
				}
			}
		}
		function load_image(id_new,src,img,last){
			document.getElementById('lazyloading').innerHTML += '<img src="'+src+'" id="'+id_new+'" />';
			imagesLoaded( document.getElementById(id_new), function(){
				img.style["-webkit-animation"] = 'mymove 0.5s forwards';
				img.style["animation"] = 'mymove 0.5s forwards';
				img.src = src;
				if (last) {document.getElementById('lazyloading').innerHTML = '';}
			});
		}
	}

	function init_angular(){
		var app = angular.module('ogvApp', []);
		app.controller('searchCtrl', function ($scope, $http) {
			$scope.contMC = "";     //Content MCs
			$scope.contSDG = "";    //Content SDGs
			$scope.chMC = "";       //Value MCs
			$scope.chSDG = "";      //Value SDGs
			$scope.myOpps = "";     //Content Opportunities Searching
			$scope.myData = "";     //Content Data Searching
			$scope.page = "";       //Page value

			//Select MCs
			$http.get("https://gis-api.aiesec.org/v2/lists/mcs.json?access_token=e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493").then(function (response) {
				$scope.contMC = response;
			});
			$scope.changeMC = function () {
				$scope.chMC = $scope.destino;
			}

			//Select ODS
			$http.get("https://gis-api.aiesec.org/v2/lists/sdg_goals.json?access_token=e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493").then(function (response) {
				$scope.contSDG = response;
			});
			$scope.changeSDG = function () {
				$scope.chSDG = $scope.ods;
			}
			//Searching function
			$scope.searchOpp = function () {
				$scope.home_mc = "";
				$scope.search = "";
				$scope.sdg = "";
				$scope.global = 0;
				if ($scope.destino != undefined)
					$scope.home_mc = "&filters[home_mcs][]=" + $scope.destino;
				if ($scope.ods != undefined)
					$scope.sdg = "&filters[sdg_goals][]=" + $scope.ods;
				if ($scope.busqueda != undefined)
				$scope.search = "&q=" + $scope.busqueda;
				$http.get("https://gis-api.aiesec.org/v2/opportunities.json?access_token=e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493" + $scope.search + $scope.home_mc + "&filters[programmes][]=1" + $scope.sdg).then(function (response) {
					setTimeout(function(){
						var pjax = new Pjax({
							selectors: ["title","#contenido_general"],
						});
					},500);
					$scope.myOpps = response.data.data;
					$scope.myData = response.data.paging;
					$scope.total_opps = myData.total_items + " prácticas disponibles para ti.";
				});
				$scope.range = function (number) {
					return new Array(number);
				}
			}
		});
		app.controller('defCtrl', function ($scope, $http) {
			$http.get("https://gis-api.aiesec.org/v2/opportunities.json?access_token=e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493&filters[programmes][]=1").then(function (response) {
				$scope.myOpps2 = response.data.data;
				$scope.myData2 = response.data.paging;
			});
		});
		angular.element(function() {
			angular.bootstrap(document.getElementById('contenido_general'), ['ogvApp']);
		});
	}

	function carousel(){

		$('.owl-carousel').owlCarousel({

			loop: true,
			items: 1,
			autoplay: true,
			autoplayTimeout: 3000,
			autoPlaySpeed: 500,
			autoplayHoverPause: false

		})
	}

	function nose(){

		var visible = true;

		$("owl-nav").remove();

		$(".owl-controls").remove();

		$(".owl-dots").insertBefore(".owl-stage");

		jQuery('.preloader').css('opacity', '0');
		setInterval(function () {
			$(".preloader").remove();
		}, 2000);

		$('.accordion-title').on('click', function (e) {
			if (visible) {
				jQuery('.btn-mas').css('opacity', '0.0');
				visible = false;
			} else {
				if ($(".is-expanded")[0]) {
					// Do something if class exists
				} else {
					jQuery('.btn-mas').css('opacity', '1.0');
					visible = true;
				}
			}
		});
		$('.centered-sq').on('click', function (e) {
			$('.centered-sq').toggleClass('shown-div hidden-div ');
		});

	}

	return{
		start:start
	}
}();

var opp_page = function(){
	function p(p){if (location.search != ""){var d=location.search.split("?");var e=d[1].split("&");for(i=0;i<e.length;i++){if(e[i].split("=")[0]==p){return e[i].split("=")[1];}}}else{return undefined;}}

	function start(reload){
		var id = (p('id')!==undefined) ? p('id') : 0;
		if(id!=0){
			init_angular(id);
		}
		if(!reload){
			index.check_if_logged(false);
		}
		remove_preloader();
	}

	function remove_preloader(){
		var visible = true;

		$("owl-nav").remove();
		$(".owl-controls").remove();
		$(".owl-dots").insertBefore(".owl-stage");
		jQuery('.preloader').css('opacity', '0');
		setInterval(function () {
			$(".preloader").remove();
		}, 2000);
		$('.accordion-title').on('click', function (e) {
			if (visible) {
				jQuery('.btn-mas').css('opacity', '0.0');
				visible = false;
			} else {
				if ($(".is-expanded")[0]) {
					// Do something if class exists
				} else {
					jQuery('.btn-mas').css('opacity', '1.0');
					visible = true;
				}
			}
		});
		$('.centered-sq').on('click', function (e) {
			$('.centered-sq').toggleClass('shown-div hidden-div ');
		});

	}

	function fill_info(obj){
		//console.log(obj);
		document.getElementsByTagName('title')[0].innerText = obj.title;
		document.getElementById('opp_name_big').innerHTML = '<h2><strong>'+obj.title+'</strong></h2>';
		document.getElementById('opp_name2').innerHTML = '<h2>'+obj.title+'</h2>';
		document.getElementById('opp_pic_big_cont').innerHTML = '<img src="'+obj.cover_photo_urls+'" id="cover_photo_'+obj.id+'" class="zoomit">';
		document.getElementById('cover_photo_'+obj.id).style["-webkit-animation"] = 'mymove 0.5s forwards';
		document.getElementById('cover_photo_'+obj.id).style["animation"] = 'mymove 0.5s forwards';
		document.getElementById('organization').innerHTML = obj.branch.name;
		document.getElementById('location').innerHTML = obj.location;
		var semanas = (obj.duration_max!==null && obj.duration_min!==null)?(obj.duration_min+' - '+obj.duration_max):(obj.duration);
		document.getElementById('duracion').innerHTML = semanas+' semanas';
		document.getElementById('duracion2').innerHTML = semanas+' semanas';
		document.getElementById('disponible_hasta').innerHTML = 'Disponible hasta el '+format_date(obj.applications_close_date);
		document.getElementById('fecha_inicio').innerHTML = format_date(obj.earliest_start_date);
		document.getElementById('fecha_final').innerHTML = format_date(obj.latest_end_date);
		document.getElementById('openings').innerHTML = obj.openings;
		document.getElementById('direccion_empresa').innerHTML = obj.branch.address_info.address_1+', '+obj.branch.address_info.city+', '+obj.branch.address_info.country;
		document.getElementById('comite_local').innerHTML = obj.host_lc.name;
		document.getElementById('descripcion').innerHTML = '<p style="font-size: 1.5em;color: #337ab7;">Descripción: </p>'+obj.description+'</br></br><p style="font-size: 1.5em;color: #337ab7;">Actividades:</p><ul id="activities_list_'+obj.id+'"></ul>';
		activities_list('activities_list_'+obj.id,obj.role_info.learning_points_list);
		document.getElementById('logistica').innerHTML = '<pre id="logistica"><p style="font-size: 1.5em;color: #337ab7;">Proceso: </p>'+obj.role_info.selection_process+'<br><br><p style="font-size: 1.5em;color: #337ab7;">Información de Seguro: </p>'+obj.legal_info.health_insurance_info+'</pre>';
		document.getElementById('aplicar_btn').addEventListener('click',function(){
			aplicar(obj.id);
		});
	}

	function init_angular(id){
		var oppPage = angular.module('oppPage', []);
		oppPage.controller('oppCtrl', function ($scope, $http) {
			$scope.data = "";
			$scope.semanas = "";
			$scope.app_close_date = "";
			$scope.fecha_inicio = "";
			$scope.fecha_final = "";

			var token = index.obtenerCookie('expa_token');
			$http.get('https://gis-api.aiesec.org/v2/opportunities/'+id+'.json?access_token='+((token==='')?('e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493'):(token))).then(function (response) {
				console.log(response.data);
				$scope.data = response.data;
				$scope.semanas = (response.data.duration_max!==null && response.data.duration_min!==null)?(response.data.duration_min+' - '+response.data.duration_max):(response.data.duration);
				$scope.app_close_date = format_date(response.data.applications_close_date);
				$scope.fecha_inicio = format_date(response.data.earliest_start_date);
				$scope.fecha_final = format_date(response.data.latest_end_date);
				render_button(!token=='',response.data.id,response.data.applied_to);
				setTimeout(function(){
					activities_list('activities_list_'+response.data.id,response.data.role_info.learning_points_list);
				},100);
			});
		});
		angular.element(function() {
			angular.bootstrap(document.getElementById('contenido_general'), ['oppPage']);
		});
	}

	function render_button(logged,id,applied){
		document.getElementById('aplicar_btn_container').innerHTML = (logged)?'<a href="#" class="opp-normal" id="aplicar_btn">Aplicar ahora</a>':'<span class="opp-normal">Inicia sesión para aplicar</span>';
		if(applied){
			document.getElementById('aplicar_btn').style.backgroundColor = '#30C39E';
			document.getElementById('aplicar_btn').innerText = 'Has aplicado!';
		} else {
			if(logged){
				document.getElementById('aplicar_btn').addEventListener('click',function(){
					aplicar(id);
				});
			}
		}
	}

	function activities_list(id,list){
		var el = document.getElementById(id);
		el.innerHTML = '';
		list.map(function(o){
			var li = document.createElement('li');
			li.innerText = o;
			el.appendChild(li);
		});
	}

	function format_date(date){
		function month(n){
			var ar = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
			return ar[n];
		}
		var d = new Date(date);
		return index.cero(d.getUTCDate())+' de '+month(d.getUTCMonth())+' de '+d.getUTCFullYear();
	}

	function aplicar(id){
		var token = index.obtenerCookie('expa_token');
		var payload = '{"application": {"opportunity_id": '+id+'}}';
		document.getElementById('aplicar_btn').innerText = 'Enviando...';
		index.ajax('POST','https://gis-api.aiesec.org/v2/applications.json?access_token='+token,payload,function(result){
			try{
				var obj = JSON.parse(result);
				if(obj.id>0){
					document.getElementById('aplicar_btn').style.backgroundColor = '#30C39E';
					document.getElementById('aplicar_btn').innerText = 'Has aplicado!';
				}
			}catch(error){
				document.getElementById('aplicar_btn').innerText = 'Aplicar ahora';
				console.log(error);
			}
		},function(error){
			document.getElementById('aplicar_btn').innerText = 'Aplicar ahora';
			console.log(error);
		},0,'application/json');
	}

	return{
		start:start
	}
}();

var gt = function(){

	function start(reload){
		carousel();
		load_accordeon();
		if(!reload){
			index.check_if_logged(false);
			remove_preloader();
		}
		load_youtube(reload);
		call_opps('1621');
		call_opps('1549');
		call_opps('1613');
		call_opps('1554');
		call_opps('1551');
	}

	function load_accordeon(){
		var script = document.createElement('script');
		script.src = 'js/accordion2.js';
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	function carousel(){
		$('.owl-carousel').owlCarousel({
			loop:true,
			items:1,
			autoplay:true,
			autoplayTimeout:3000,
			autoPlaySpeed: 500,
			autoplayHoverPause:false
		})
	}

	function load_youtube(reload){
		// Replace the 'ytplayer' element with an <iframe> and
		// YouTube player after the API code downloads.
		window.onYouTubePlayerAPIReady = function() {
			var player = new YT.Player('ytplayer', {
				height: '272',
				width: '100%',
				videoId: 'M7lc1UVf-VE'
			});

			var player2 = new YT.Player('ytplayer-2', {
				height: '270',
				width: '100%',
				videoId: 'LtynkOyrjao'
			});
		}

		if(!reload){
			// Load the IFrame Player API code asynchronously.
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			onYouTubePlayerAPIReady();
		}
	}

	function call_opps(mc){
		index.ajax('GET','https://gis-api.aiesec.org/v2/opportunities.json?access_token=e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493&filters[home_mcs][]='+mc+'&filters[programmes][]=2&filters[last_interaction][from]=2017-01-30&filters[earliest_start_date]=2017-6-15&sort=created_at','',function(result){
			try{
				var obj = JSON.parse(result);
				var semanas = [];
				var locations = [];
				document.getElementById('card_view_container_'+mc).innerHTML = '';
				for (var i = 0; i < 3; i++) {
					//console.log(obj.data[i]);
					semanas[i] = (obj.data[i].duration_max!==null && obj.data[i].duration_min!==null)?(obj.data[i].duration_min+' - '+obj.data[i].duration_max):(obj.data[i].duration);
					locations[i] = (obj.data[i].location===null)?(obj.data[i].city):(obj.data[i].location);
					document.getElementById('card_view_container_'+mc).innerHTML += '<div class="col-md-4 translateit">'+
					'<div class="panel panel-default">'+
					'<div class="thumbnail-2 height-6"><img src="'+obj.data[i].cover_photo_urls+'" class=""><p  class="lead leadExtra">'+obj.data[i].title+'</p></div>'+
					'<div class="panel-body">'+
					'<p class="sizeLarge">'+obj.data[i].branch.name+'<br>'+semanas[i]+' semanas<br>'+locations[i]+'.</p>'+
					'<hr>'+
					'<a class="a-card" href="#">Ver práctica</a></div></div></div>';
				}
			}catch(error){
				console.log(error);
			}
		},function(error){
			console.log(error);
		},0);
	}

	function remove_preloader(){
		var visible = true;
		$("owl-nav").remove();
		$( ".owl-controls" ).remove();
		$( ".owl-dots" ).insertBefore( ".owl-stage" );
		jQuery('.preloader').css('opacity', '0');
		setInterval(function(){
			$( ".preloader" ).remove();
		},2000);

		$('.accordion-title').on('click', function(e){
			if (visible) {
				//jQuery('.btn-mas').css('opacity', '0.0');
				// $('[aria-expanded="false"]').css('opacity', '0.0');
				visible = false;
			} else {
				if ($(".is-expanded")[0]){
					// Do something if class exists
				} else {
					//jQuery('.btn-mas').css('opacity', '1.0');  
					// $('[aria-expanded="false"]').css('opacity', '1.0');
					visible = true;
				}
			}
		})
	}

	return{
		start:start
	}
}();

var init_function = {'index':index.start,'busqueda_ogv':busqueda_ogv.start,'opp_page':opp_page.start,'gt':gt.start};