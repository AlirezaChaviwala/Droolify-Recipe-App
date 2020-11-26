let search = document.getElementById('searchbar');
let but = document.getElementById('butt');
let searchval = '';

but.onclick = () => {
    searchval = search.value;
    fetchData(searchval);
}

search.addEventListener('keydown', (event) => {
    //var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (event.key === 13) {
        but.onclick();
    }
});

function setAttr(val1, val2, element) {
    for (var i = 0; i < val1.length; i++) {
        element.setAttribute(val1[i], val2[i]);
    }
}

let modalidnum = 1;
let butnum = 1;
let sbl = 1;

function fetchData(value) {
    fetch(`https://api.edamam.com/search?q=${value}&app_id=c9a5f345&app_key=df7b09d8b2b1da93ab967e8f66ded989`)
        .then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result);

            let container = document.createElement('div');
            container.setAttribute('class', 'container');
            document.getElementById('result-body').innerHTML = ''
            document.getElementById('result-body').setAttribute('style', 'margin-top:100px;');
            document.getElementById('result-body').append(container);

            let deck = document.createElement('div');
            deck.setAttribute('class', 'card-deck')
            container.append(deck);

            let mainrow = document.createElement('div');
            mainrow.setAttribute('class', 'row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1');
            deck.append(mainrow);

            result.hits.forEach(element => {
                let col = document.createElement('div');
                col.setAttribute('class', 'col mb-4')
                mainrow.append(col);

                let card = document.createElement('div');
                card.setAttribute('class', 'card shadow-lg');
                col.append(card);

                let cardheader = document.createElement('div');
                cardheader.setAttribute('class', 'card-header');
                cardheader.innerHTML = `${element.recipe.label}`;
                card.append(cardheader);

                let image = document.createElement('img');
                image.src = `${element.recipe.image}`;
                card.append(image);

                let cardfooter = document.createElement('div');
                cardfooter.setAttribute('class', 'card-footer');


                let but2 = document.createElement('button');
                setAttr(['type', 'data-toggle', 'class', 'data-target', 'id'], ['button', 'modal', 'btn btn-success rounded-pill', `#myModal${modalidnum}`, `myButton${butnum}`], but2)
                but2.innerHTML = `<i class="fas fa-utensils"></i> More Information`;
                butnum++;
                cardfooter.append(but2);
                card.append(cardfooter);


                let modal = document.createElement('div');
                setAttr(['class', 'data-backdrop', 'data-keyboard', 'tabindex', 'aria-labelledby', 'aria-hidden', 'id'], ['modal fade', 'static', 'false', '-1', `staticBackdropLabel${sbl}`, 'true', `myModal${modalidnum}`], modal);
                modalidnum++;

                let modaldialog = document.createElement('div');
                modaldialog.setAttribute('class', 'modal-dialog modal-dialog-scrollable');
                modal.append(modaldialog);

                let modalcontent = document.createElement('div');
                modalcontent.setAttribute('class', 'modal-content');
                modaldialog.append(modalcontent);

                let modalheader = document.createElement('div');
                modalheader.setAttribute('class', 'modal-header bg-success');
                modalcontent.append(modalheader);
                let title = document.createElement('h5');
                setAttr(['class', 'id', 'style'], ['modal-title', `staticBackdropLabel${sbl}`, 'color:white'], title);
                title.innerText = `${element.recipe.label}`;
                let close = document.createElement('button');
                setAttr(['type', 'class', 'data-dismiss', 'aria-label'], ['button', 'close', 'modal', 'Close'], close);
                close.innerHTML = '<span aria-hidden="true">&times;</span>';
                modalheader.append(title, close);

                let modalbody = document.createElement('div');
                modalbody.setAttribute('class', 'modal-body text-left');
                let tags = document.createElement('h5');
                tags.setAttribute('style', 'color:green');
                tags.innerText = 'Tags:'
                modalbody.append(tags);
                element.recipe.healthLabels.forEach((el) => {
                    let tag = document.createElement('span');
                    tag.setAttribute('class', 'badge badge-primary mr-1 mb-2');
                    tag.innerText = `#${el} `;
                    modalbody.append(tag);
                });

                let ings = document.createElement('h5');
                ings.setAttribute('style', 'color:green');
                ings.innerText = 'Ingredients:'
                modalbody.append(ings);
                let inglist = document.createElement('ul');
                modalbody.append(inglist);
                element.recipe.ingredientLines.forEach((el) => {
                    let ing = document.createElement('li');
                    ing.innerText = `${el}`;
                    inglist.append(ing);
                })

                let reclink = document.createElement('div');
                reclink.innerHTML = `<a href=${element.recipe.url}><h5 style='color:green'>Recipe Link</h5></a>`
                modalbody.append(reclink);

                let cals = document.createElement('h5');
                setAttr(['style', 'class'], ['color:green', 'd-inline'], cals)
                let calval = document.createElement('h5');
                calval.innerText = Math.floor(element.recipe.calories);
                setAttr(['style', 'class'], ['color:black', 'd-inline'], calval)
                cals.innerHTML = `Calories: `;
                cals.append(calval);
                modalbody.append(cals);

                let nutr = document.createElement('h5');
                nutr.setAttribute('style', 'color:green');
                nutr.innerText = 'Vital Nutrients:'
                modalbody.append(nutr);

                let nutrlist = document.createElement('ul');
                modalbody.append(nutrlist);
                let vita = document.createElement('li');
                vita.innerText = `Vitamin A: ${Math.floor(element.recipe.totalNutrients.VITA_RAE.quantity)} ${element.recipe.totalNutrients.VITA_RAE.unit}`;
                nutrlist.append(vita);
                let vitb6 = document.createElement('li');
                vitb6.innerText = `Vitamin B6: ${Math.floor(element.recipe.totalNutrients.VITB6A.quantity)} ${element.recipe.totalNutrients.VITB6A.unit}`;
                nutrlist.append(vitb6);
                let vitb12 = document.createElement('li');
                vitb12.innerText = `Vitamin B12: ${Math.floor(element.recipe.totalNutrients.VITB12.quantity)} ${element.recipe.totalNutrients.VITB12.unit}`;
                nutrlist.append(vitb12);
                let vitc = document.createElement('li');
                vitc.innerText = `Vitamin C: ${Math.floor(element.recipe.totalNutrients.VITC.quantity)} ${element.recipe.totalNutrients.VITC.unit}`;
                nutrlist.append(vitc);
                let vitd = document.createElement('li');
                vitd.innerText = `Vitamin D: ${Math.floor(element.recipe.totalNutrients.VITD.quantity)} ${element.recipe.totalNutrients.VITD.unit}`;
                nutrlist.append(vitd);
                let vite = document.createElement('li');
                vite.innerText = `Vitamin E: ${Math.floor(element.recipe.totalNutrients.TOCPHA.quantity)} ${element.recipe.totalNutrients.TOCPHA.unit}`;
                nutrlist.append(vite);
                let vitk = document.createElement('li');
                vitk.innerText = `Vitamin K: ${Math.floor(element.recipe.totalNutrients.VITK1.quantity)} ${element.recipe.totalNutrients.VITK1.unit}`;
                nutrlist.append(vitk);

                let modalfooter = document.createElement('div');
                modalfooter.setAttribute('class', 'modal-footer');
                modalfooter.innerHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>`

                modalcontent.append(modalbody, modalfooter);
                cardfooter.append(modal);


            });


        })
        .catch((err) => {
            console.log(err);
        })
}