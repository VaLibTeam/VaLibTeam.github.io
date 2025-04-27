const buildSteps = [
    {
        title: "Step 1: Clone the repository",
        content: [
            { type: "text", value: "To start, clone the repository from GitHub." },
            { type: "terminal", value: "git clone https://github.com/VaLibTeam/VaLib.git" },
            { type: "text", value: "You will get the VaLib/ directory, where the library files will be." },
            { type: "text", value: "Now you can move into it:" },
            { type: "terminal", value: "cd VaLib/" },
        ]
    },
    {
        title: "Step 2: Build",
        content: [
            { type: "text", value: "Now you can compile the library using our build script:" },
            { type: "terminal", value: "./build.sh --target={target}" },
            {
                type: "list",
                title: "Replace `{target}` with the desired output type. Available options:",
                items: [
                    "static – builds a static library (`.a`)",
                    "shared – builds a shared library (`.so`)",
                    "object – builds a single object file (`.o`)",
                    "all – builds all of the above: static, shared, and object"
                ]
            },
            { type: "text", value: "Once built, you're ready to install the library system-wide." }
        ]
    }
];

const installSteps = [
    {
        title: "Step 1: Install library",
        content: [
            { type: "text", value: "To install VaLib, you can use the same build tool as above. use:" },
            { type: "terminal", value: "./build.sh --target={target} --install-libs" },
        ]
    },
    {
        title: "(optional) Step 2: Install headers",
        content: [
            { type: "text", value: "To install the header files and make VaLib available for use in your projects, run:" },
            { type: "terminal", value: "./build.sh --install-headers" },
        ]
    },
    {
        title: "Step 3: Verify installation",
        content: [
            { type: "text", value: "To verify everything is correctly installed, run:" },
            { type: "terminal", value: "scripts/check-install.sh" },
        ]
    },
];

function highlightBash(code) {
    const keywords = new Set(["if", "then", "else", "fi", "for", "while", "do", "done", "in", "case", "esac"]);

    const tokens = code.trim().split(/\s+/);

    return tokens.map((token, index) => {
        if (/^(['"`]).*\1$/.test(token))
            return `<span class="sh-string">${token}</span>`;

        if (keywords.has(token))
            return `<span class="sh-keyword">${token}</span>`;

        if (index === 0)
            return `<span class="sh-command">${token}</span>`;

        if (/^--?[a-zA-Z0-9][\w-]*$/.test(token))
            return `<span class="sh-flag">${token}</span>`;

        return `<span class="sh-arg">${token}</span>`;
    }).join(" ");
}

function createStepElements(containerId, steps) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    steps.forEach((step, index) => {
        const stepDiv = document.createElement("div");
        stepDiv.className = "step";
        if (index === 0) stepDiv.classList.add("active");

        const title = document.createElement("h3");
        title.textContent = step.title;
        stepDiv.appendChild(title);

        step.content.forEach(part => {
            if (part.type === "text") {
                const p = document.createElement("p");
                p.textContent = part.value;
                stepDiv.appendChild(p);
            } else if (part.type === "terminal") {
                const terminal = document.createElement("div");
                terminal.className = "terminal"
                terminal.innerHTML = highlightBash(part.value)

                const copyBtn = document.createElement("button");
                copyBtn.className = "copy-btn";
                copyBtn.textContent = "Copy";
                copyBtn.onclick = () => copyToClipboard(part.value);
                terminal.appendChild(copyBtn);

                stepDiv.appendChild(terminal);
            } else if (part.type === "list") {
                const section = document.createElement("div");
                section.className = "info-list";

                if (part.title) {
                    const heading = document.createElement("p");
                    heading.innerHTML = `<strong>${part.title}</strong>`;
                    section.appendChild(heading);
                }

                const ul = document.createElement("ul");
                part.items.forEach(item => {
                    const li = document.createElement("li");
                    li.innerHTML = item;
                    ul.appendChild(li);
                });

                section.appendChild(ul);
                stepDiv.appendChild(section);
            } else if (part.type === "image") {
                const img = document.createElement("img");
                img.src = part.value
                img.alt = "Step image"
                img.className = "step-image"
                stepDiv.appendChild(img)
            }
        });

        container.appendChild(stepDiv);
    });
}

function setupStepLogic(prefix, steps) {
    let currentIndex = 0;

    const stepElements = () => [...document.querySelectorAll(`#${prefix}-steps .step`)];
    const progressBar = document.getElementById(`${prefix}-progress`);
    const update = () => {
        stepElements().forEach((el, i) => {
            el.classList.toggle("active", i === currentIndex);
        });
        progressBar.style.width = ((currentIndex + 1) / steps.length) * 100 + "%";

        document.getElementById(`${prefix}-prev`).disabled = currentIndex === 0;
        document.getElementById(`${prefix}-next`).textContent = (currentIndex === steps.length - 1)
            ? (prefix === "build" ? "Go to install" : "Finish")
            : "Next";
    };

    document.getElementById(`${prefix}-prev`).onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            update();
            if (prefix === "build" && currentIndex === steps.length-1) {
                document.getElementById("how-to-install").scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else if (prefix === "install") {
            document.getElementById("how-to-install").style.display = "none";
            document.getElementById("how-to-build").scrollIntoView({ behavior: "smooth", block: "center" });
            update();
        }
    };

    document.getElementById(`${prefix}-next`).onclick = () => {
        if (currentIndex < steps.length - 1) {
            currentIndex++
            update()
        } else if (prefix === "build") {
            document.getElementById("how-to-install").style.display = "block";
            document.getElementById("how-to-install").scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    update();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    createStepElements("build-steps", buildSteps);
    createStepElements("install-steps", installSteps);
    setupStepLogic("build", buildSteps);
    setupStepLogic("install", installSteps);
});
