const filter = document.querySelector('.filter-sub');
const main = document.querySelector('main');
const clear = document.querySelector('.clear');
let closes = [];
let arr = [];

const header = document.querySelector('header');

(async function() {
    let res = await fetch("./data.json");
    let data = await res.json();

    for (let curr of data) {
        const container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = `<img src="${curr.logo}" alt="logo">
        <div class="head">
        <div class="wrapper">
            <div class="top">
                <h2>${curr.company}</h2>
    
                <div class="stat">
                </div>
            </div>
    
            <a href="#">${curr.position}</a>
    
            <ul class="availability">
                <li>${curr.postedAt}</li>
                <li>${curr.contract}</li>
                <li>${curr.location}</li>
            </ul>
        </div>

          <hr>
          
          <div class="tags">
          </div>`;

        if (curr.new) {
            const span = document.createElement('span');
            span.classList.add('new');
            span.textContent = 'New!'
            container.querySelector('.stat').append(span);
        }
        if (curr.featured) {
        container.classList.add('featured');
        const span = document.createElement('span');
        span.classList.add('feature');
        span.textContent = 'Featured'
        container.querySelector('.stat').append(span);
        }

        let types = curr.position.split(' ');

        const btn1 = document.createElement('button');
        btn1.dataset.type = curr.role;
        btn1.textContent = curr.role;
        container.querySelector('.tags').appendChild(btn1);

        const btn2 = document.createElement('button');
        btn2.dataset.type = curr.level;
        btn2.textContent = curr.level;
        container.querySelector('.tags').appendChild(btn2);

        for (l of curr.languages) {
            const btn = document.createElement('button');
            btn.dataset.type = l;
            btn.textContent = l;
            container.querySelector('.tags').appendChild(btn);
        }
        for (t of curr.tools) {
            const btn = document.createElement('button');
            btn.dataset.type = t;
            btn.textContent = t;
            container.querySelector('.tags').appendChild(btn);
        }

        main.appendChild(container);
    }

    const buttons = main.querySelectorAll('.tags button');
    buttons.forEach(button => {
        button.onclick = () => {
            filterType(button.dataset.type);
            updateContainer();
        }
    })
    
})();

clear.onclick = () => {
    arr = [];
    filter.innerHTML = '';
    main.querySelectorAll('.container').forEach(container => container.classList.remove('remove'));
    filter.closest('.filter').style.display = 'none';
}

function addFilter() {
    filter.innerHTML = '';
    for (i of arr) {
        const el = document.createElement('div');
        el.classList.add('span');
        el.innerHTML = `<p>${i}</p>
        <button aria-label="remove button"><img src="images/icon-remove.svg" alt=""></button>`;
        filter.appendChild(el);
        filter.closest('.filter').style.display = 'flex';

        // remove filter element
        closes = [];
        closes.push(el.querySelector('button'));
        closes.forEach(close => {
            close.onclick = () => {
                filter.removeChild(close.closest('.span'));
                arr.splice(arr.indexOf(close.previousElementSibling.textContent), 1)
                updateContainer();
                if (filter.innerHTML) {
                    filter.closest('.filter').style.display = 'flex';
                } else {
                    filter.closest('.filter').style.display = 'none';
                }
            }
        })
    }
}

function filterType(type) {
    if (!arr.includes(type)) {
        arr.push(type);
        addFilter();
    }
}

function updateContainer() {
    const containers = main.querySelectorAll('.container');
    containers.forEach(container => {
        const buttons = container.querySelectorAll('button');
        let check = [];
        for (i of buttons) {
            check.push(i.dataset.type)
        }

        let include = true;
        for (j of arr) {
            if (!check.includes(j)) {
                include = false;
            }
        }
        if (!include) {
            container.classList.add('remove');
        } else {
            container.classList.remove('remove');
        }
    })
}

function changeBg() {
    if (document.body.clientWidth < 700) {
        header.style["background-image"] = "url(images/bg-header-mobile.svg)";
    } else {
        header.style["background-image"] = "url(images/bg-header-desktop.svg)";
    }
}

changeBg();

window.onresize = changeBg;