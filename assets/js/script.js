// assets/js/script.js
// Scripts leves para interatividade do site Turistar.com

document.addEventListener('DOMContentLoaded', function(){
	// Atualiza o ano no footer
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// Validação de formulário estilo bootstrap
	const form = document.getElementById('contactForm');
	const formAlert = document.getElementById('formAlert');

	if(form){
		form.addEventListener('submit', function(e){
			e.preventDefault();
			e.stopPropagation();

			if(!form.checkValidity()){
				form.classList.add('was-validated');
				// mostrar erro inline pequeno (bootstrap gerencia invalid-feedback)
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

			// Limpar formulário e validação
			form.reset();
			form.classList.remove('was-validated');

			// Esconder a mensagem depois de 6s
			setTimeout(()=>{
				if(formAlert) formAlert.classList.add('d-none');
			}, 6000);
		});
	}

	// Melhoria pequena: scroll suave para links internos
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if(href.length>1 && document.querySelector(href)){
				e.preventDefault();
				document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
				// Fechar navbar no mobile se estiver aberta
				const bsCollapse = document.querySelector('.navbar-collapse');
				if(bsCollapse && bsCollapse.classList.contains('show')){
					new bootstrap.Collapse(bsCollapse).toggle();
				}
			}
		});
	});

	// Handler para inscrição na newsletter
	const newsletterForm = document.getElementById('newsletterForm');
	if(newsletterForm){
		newsletterForm.addEventListener('submit', function(e){
			e.preventDefault();
			const emailInput = this.querySelector('input[type="email"]');
			const email = emailInput ? emailInput.value.trim() : '';
			// Validação simples
			if(!email || email.indexOf('@') === -1){
				alert('Por favor, insira um e-mail válido.');
				return;
			}
			// Exibir alerta de sucesso
			alert('Email cadastrado com sucesso');
			// Limpar entrada
			if(emailInput) emailInput.value = '';
		});
	}

	// Animar contadores ao fazer scroll
	const animateCounters = () => {
		const counters = document.querySelectorAll('.stat-number');
		const observerOptions = {
			threshold: 0.5,
			rootMargin: '0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if(entry.isIntersecting && !entry.target.classList.contains('animated')){
					const target = parseInt(entry.target.getAttribute('data-target'));
					const element = entry.target;
					let current = 0;
					const increment = target / 40;
					
					const counter = setInterval(() => {
						current += increment;
						if(current >= target){
							element.textContent = target.toLocaleString('pt-BR');
							element.classList.add('animated');
							clearInterval(counter);
						} else {
							element.textContent = Math.floor(current).toLocaleString('pt-BR');
						}
					}, 30);
				}
			});
		}, observerOptions);

		counters.forEach(counter => observer.observe(counter));
	};

	animateCounters();

	// Cálculo de Reserva
	const reservaForm = document.getElementById('reservaForm');
	if(reservaForm){
		const dataViagem = document.getElementById('dataViagem');
		const numPessoas = document.getElementById('numPessoas');
		const tipoQuarto = document.getElementById('tipoQuarto');
		const promocao = document.getElementById('promocao');

		const hospedagemEl = document.getElementById('hospedagem');
		const subtotalEl = document.getElementById('subtotal');
		const descontoEl = document.getElementById('desconto');
		const totalEl = document.getElementById('total');
		const parcelamentoEl = document.getElementById('parcelamento');

		const calcularReserva = () => {
			// Valores fixos
			const vooBase = 3500;
			const seguroBase = 250;
			const extrasBase = 300;
			const noites = 7;

			// Obter valores selecionados
			const precoQuarto = tipoQuarto.value ? parseFloat(tipoQuarto.value) : 0;
			const pessoas = numPessoas.value ? parseInt(numPessoas.value) : 1;
			const promocaoValue = promocao.value ? parseInt(promocao.value) : 0;

			// Calcular hospedagem
			const hospedagem = precoQuarto * noites;

			// Calcular subtotal
			let subtotal = hospedagem + vooBase + seguroBase + extrasBase;

			// Aplicar desconto
			let desconto = 0;
			if(promocaoValue === 500){
				desconto = 500; // Desconto fixo de R$ 500
			} else if(promocaoValue > 0){
				desconto = (subtotal * promocaoValue) / 100;
			}

			// Calcular total
			const total = subtotal - desconto;

			// Atualizar elementos
			hospedagemEl.textContent = `R$ ${hospedagem.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
			subtotalEl.textContent = `R$ ${subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
			descontoEl.textContent = `- R$ ${desconto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
			totalEl.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

			// Mostrar parcelamento
			if(total > 0){
				const valorParcelado = total / 12;
				parcelamentoEl.innerHTML = `<i class="bi bi-credit-card me-1"></i>12x de R$ ${valorParcelado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
			}
		};

		// Adicionar event listeners
		tipoQuarto.addEventListener('change', calcularReserva);
		numPessoas.addEventListener('change', calcularReserva);
		promocao.addEventListener('change', calcularReserva);

		// Calcular ao carregar página
		calcularReserva();

		// Ao enviar formulário
		reservaForm.addEventListener('submit', function(e){
			e.preventDefault();
			
			if(!reservaForm.checkValidity()){
				reservaForm.classList.add('was-validated');
				return;
			}

			const totalValue = totalEl.textContent;
			alert(`Reserva confirmada! Total a pagar: ${totalValue}\n\nVocê será redirecionado para o pagamento...`);
			// Aqui você redirecionaria para a página de pagamento
		});
	}

});