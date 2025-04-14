async function loadExamples() {
    const meta = await fetch('examples.json').then(res => res.json());
    const container = document.querySelector('main');

    for (const [key, data] of Object.entries(meta)) {
        const raw = await fetch(`examples/${key}.cpp`).then(r => r.text());
        const [code, output] = raw.split('/* --- output ---').map(s => s.trim().replace(/\*\/$/, ''));

        const div = document.createElement('div');
        div.className = 'example';
        div.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <pre class="code-block">
        <button class="copy-btn" onclick="copyCode(this)" title="Copy to clipboard">
          <i class="fas fa-copy"></i>
        </button>
        <code class="language-cpp">${escapeHTML(code)}</code>
      </pre>
      <div class="buttons">
        <button onclick="showOutput('${key}')"><i class="fas fa-play"></i> Show result</button>
        <button onclick="downloadCode('${key}', \`${escapeBackticks(code)}\`)"><i class="fas fa-download"></i> Download</button>
      </div>
      <pre id="out-${key}" class="output"><code>${escapeHTML(output)}</code></pre>
    `;
        container.appendChild(div);

        const codeBlock = div.querySelector('pre code');
        hljs.highlightElement(codeBlock);

        // Trigger fade-in animation
        setTimeout(() => {
            div.classList.add('visible');
        }, 50);
    }
}

function copyCode(btn) {
    const code = btn.parentElement.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied');
        btn.title = 'Copied!';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.title = 'Copy to clipboard';
        }, 1500);
    }).catch(err => {
        console.error('Copy failed', err);
        btn.title = 'Failed to copy';
    });
}

function showOutput(key) {
    const block = document.getElementById(`out-${key}`);
    block.classList.toggle('open');
}

function downloadCode(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.cpp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, s => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[s]);
}

function escapeBackticks(str) {
    return str.replace(/`/g, '\\`');
}

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    const icon = document.querySelector('#toggleTheme i');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
});

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.querySelector('#toggleTheme i').classList.replace('fa-moon', 'fa-sun');
    }
    loadExamples();
};
