// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const sunIcon = themeToggle.querySelector('.sun');
const moonIcon = themeToggle.querySelector('.moon');

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    } else {
        document.body.classList.remove('light-mode');
        moonIcon.classList.add('active');
        sunIcon.classList.remove('active');
    }
    localStorage.setItem('fuelwise-theme', theme);
}

// Carrega tema salvo
const savedTheme = localStorage.getItem('fuelwise-theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('light-mode');
    setTheme(isDark ? 'light' : 'dark');
});

// ===== CALCULADORA =====
document.getElementById('combustivelForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const precoGasolina = parseFloat(document.getElementById('precoGasolina').value);
    const precoAlcool   = parseFloat(document.getElementById('precoAlcool').value);
    const consumoGasolina = parseFloat(document.getElementById('consumoGasolina').value);
    const consumoAlcool   = parseFloat(document.getElementById('consumoAlcool').value);

    if (precoGasolina <= 0 || precoAlcool <= 0 || consumoGasolina <= 0 || consumoAlcool <= 0) {
        alert('Preencha todos os campos com valores maiores que zero.');
        return;
    }

    const custoGasolina = precoGasolina / consumoGasolina;
    const custoAlcool   = precoAlcool   / consumoAlcool;

    let vantagem, icon;
    if (custoAlcool < custoGasolina) {
        vantagem = 'Álcool';
        icon     = '🟢';
    } else if (custoGasolina < custoAlcool) {
        vantagem = 'Gasolina';
        icon     = '🔵';
    } else {
        vantagem = 'Empate';
        icon     = '⚖️';
    }

    const economia = Math.abs(custoGasolina - custoAlcool);

    const resultado = document.getElementById('resultado');
    resultado.classList.remove('hidden');

    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultTitle').textContent =
        vantagem === 'Empate' ? 'Ambos têm o mesmo custo!' : `${vantagem} é mais vantajoso`;
    document.getElementById('resultSubtitle').textContent =
        vantagem === 'Empate' ? 'Custo por km idêntico' : 'Menor custo por quilômetro rodado';

    const maxCusto = Math.max(custoGasolina, custoAlcool);
    document.getElementById('barGasolina').style.width = ((custoGasolina / maxCusto) * 100) + '%';
    document.getElementById('barAlcool').style.width   = ((custoAlcool   / maxCusto) * 100) + '%';

    document.getElementById('custoGasolina').textContent = `R$ ${custoGasolina.toFixed(4)}/km`;
    document.getElementById('custoAlcool').textContent   = `R$ ${custoAlcool.toFixed(4)}/km`;

    const economiaBox = document.getElementById('economiaBox');
    if (vantagem !== 'Empate') {
        economiaBox.style.display = 'flex';
        document.getElementById('economiaTexto').textContent =
            `Economia de R$ ${economia.toFixed(4)}/km com ${vantagem}`;
    } else {
        economiaBox.style.display = 'none';
    }
});
