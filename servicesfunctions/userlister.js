function recentProduct(user_content, what) {
    //console.log(user_content);
    const userContainer = document.getElementById('rendadata');

    if (user_content.length > 0) {
        userContainer.classList.remove("offer-section");
        userContainer.classList.add("project-section");
        userContainer.classList.add("projectpage-section");
        userContainer.innerHTML = `
        
            <figure class="offer-top-layout mb-0">
                <img src="assets/images/offer-top-layout.png" alt="" class="img-fluid">
            </figure>
            <div class="container">
                <div class="project_wrapper">
                    <div class="row" id="userContents">
                               
                    </div>
                </div>
            </div>
            <figure class="offer-bottomlayer mb-0">
                <img src="assets/images/offer-bottomlayer.png" alt="" class="img-fluid">
            </figure>
        
        `;

        const userContents = document.getElementById('userContents');
        user_content.forEach((user, index) => {
            const contenttHTML = `
                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="case-box overlay">
                        <div class="overlay-image">
                            <figure class="image mb-0">
                                <img src="${user.image[0] ? user.image[0].ima : "assets/images/baby1.webp"}" alt="" class="">
                            </figure>
                        </div>
                        <div class="content" style="cursor: pointer;">
                            <h5 class="text-white" style="filter: blur(7px);">Nounou & Menange</h5>
                            <p class="text-white" style="filter: blur(7px);">Tél: 0700000000</p>
                            <p class="text-white" style="filter: blur(7px);">Cocody Riviera 2</p>
                            <p class="text-white text-size-18">${user.bio}</p>
                        </div>
                        <span class="text-white" style="filter: blur(2px);">Olivia Djedje</span>
                    </div>
                </div>    
        `;

            userContents.innerHTML += contenttHTML;

        });
    } else {
        const userContainera = document.getElementById('rendadatb');

        userContainera.innerHTML = `
                            <h6>Bienvenue</h6>
                            <h2>Aucun ${what} ne s'est inscrit pour l'instant</h2>
                            <p>Nous n'avons pour l'instant aucun candidat inscrit. Revenez plus tard ou inscrivez-vous.</p>
            
        `;
    };

};


