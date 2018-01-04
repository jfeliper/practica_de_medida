// Actualizacion de datos.
$(document).ready(function(){
	// Espacios en en el tapiz
	var dato_img=$('#image');
	var dato_pho=$('#photo');
	var dato_cantidad=$('#cantidad');

	// Actualiza los datos mostrados en los huecos.
	var secuencia = 0;
	var diapo = [
								"img/logopos.jpeg",
								"img/la_energia.png",
								"https://emoncms.org/dashboard/view?id=45620",
								"img/colaborativo.png",
								"img/invierte.png",
								"img/equipo.png",
								"img/profesionales.png",
								"img/sensibiliza.png",
								"img/logoneg.jpeg",
								"https://emoncms.org/dashboard/view?id=44821",
								"img/acondicionador.jpeg",
								"img/escaleras.jpeg",
								"img/termostato.jpeg",
								"img/luz.jpeg",
								"img/imprimes.jpeg",
								"img/puertas.jpeg",
								"img/standby.jpeg"
							];

	var ajuste=function(){
		// Dimensiones panel.

		var panel_anchura=980;
		var panel_altura=551;

		// Dimensiones lienzo.


		var lienzo_anchura=window.innerWidth;
		var lienzo_altura=window.innerHeight;

		var escala_anchura = lienzo_anchura/panel_anchura;
		var escala_altura = lienzo_altura/panel_altura;
		var escala_final = lienzo_anchura/panel_anchura;


		// Ajuste.

		if( escala_anchura < escala_altura) {
			escala_final = escala_anchura;
		}

		else {
			escala_final = escala_altura;
		}

		var desplazamiento_horizontal=((lienzo_anchura-(escala_final * panel_anchura))/2);
		var desplazamiento_vertical=  ((lienzo_altura-(escala_final * panel_altura))/2);


		$('#panel').css('transform','scale('+(escala_final)+')');
		//$('body').css('transform-origin,0 0');
		//$('body').css('transform-origin',0 0);
		// $('#panel').css('transform-origin',+(desplazamiento_horizontal/2000)+'px '+(desplazamiento_vertical/2000)+'px');
		$('#panel').css('transform-origin',+0+'px '+0+'px');
 		$('#panel').css({ 'left': desplazamiento_horizontal+ 'px', 'top': desplazamiento_vertical + 'px' });


		$(dato_cantidad).text(panel_anchura);

	};

	var pantalla_completa=function(){
		var pantalla=document.body;
		var request_full_screen=pantalla.requestFullScreen || pantalla.webkitRequestFullScreen || pantalla.mozRequestFullScreen || pantalla.msRequestFullScreen;
		request_full_screen.call(pantalla);
	};

	var actualizar_datos=function(){

			if (!diapo[secuencia]) {secuencia=0;}

			$("#miIframe").css("display", "none");
			$("#photo").css("display", "none");

			var pos_img = diapo[secuencia].indexOf("img");
			var pos_http = diapo[secuencia].indexOf("http");

			if (pos_img==0){
				$("#photo").attr("src",diapo[secuencia]);
				$("#photo").fadeIn(5000);
				$("#photo").css("display", "block");
				secuencia = secuencia +1;
			}

			else if (pos_http==0){
				$('#miIframe').attr('src', diapo[secuencia]);
				$("#miIframe").fadeIn(5000);
				$("#miIframe").css("display", "block");
				secuencia = secuencia +1;
			}

			else {
				secuencia = 0;
			}
			//$(dato_cantidad).text(secuencia);
		  ajuste();

	};


	// Autorecarga.
	var autorecarga_intervalo=0*60+10; // 5 minutos.


	window.setInterval(function(){
		actualizar_datos();

	},autorecarga_intervalo*1000);

	actualizar_datos();


	// Ajuste a pantalla.

	$(window).on('resize',function(){
		ajuste();
	});

	ajuste();

	// Pantalla completa.
	$('#cantidad').on('click',function(){
		pantalla_completa();

	});

});
