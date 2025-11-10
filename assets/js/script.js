// assets/js/script.js
// Scripts leves para interatividade do site Turistar.com

document.addEventListener('DOMContentLoaded', function(){
	// Atualiza o ano no footer
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// Form validation bootstrap-style
	const form = document.getElementById('contactForm');
	const formAlert = document.getElementById('formAlert');

	if(form){
		form.addEventListener('submit', function(e){
			e.preventDefault();
			e.stopPropagation();

			if(!form.checkValidity()){
				form.classList.add('was-validated');
				// show small inline error (bootstrap handles invalid-feedback)
				return;
			}

			// Simula envio (aqui você integraria com backend / serviço)
			const name = form.querySelector('#name').value;

			// Mostrar alerta de sucesso
			if(formAlert){
				formAlert.className = 'alert alert-success';
				formAlert.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;
				formAlert.classList.remove('d-none');
			}

			// limpar form e validação
			form.reset();
			form.classList.remove('was-validated');

			// esconder a mensagem depois de 6s
			setTimeout(()=>{
				if(formAlert) formAlert.classList.add('d-none');
			}, 6000);
		});
	}

	// Small enhancement: smooth scroll for internal nav links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if(href.length>1 && document.querySelector(href)){
				e.preventDefault();
				document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
				// collapse navbar on mobile if open
				const bsCollapse = document.querySelector('.navbar-collapse');
				if(bsCollapse && bsCollapse.classList.contains('show')){
					new bootstrap.Collapse(bsCollapse).toggle();
				}
			}
		});
	});

});

/*
	Nota: Este script faz validação front-end básica e mostra um alerta de sucesso
	ao submeter o formulário. Para envio real, integre com um servidor ou serviço
	de envio de e-mails (ex.: Formspree, Netlify Forms, backend próprio etc.).
*/

