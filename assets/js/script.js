$("document").ready(function () {
    // TOMAR EL VALOR DEL INPUT
    $("form").submit(function (event) {
        event.preventDefault();

        // INGRESAR EN LA VARIABLE
        let valueInput = $("#heroInput").val();

        // VALIDAR QUE EL USUARIO NO INGRESE UN NUMERO MAYOR A 731
        if (valueInput > 731) {
            alert("Ingrese un número entre 1 y 731");
        }

        // AJAX

        $.ajax({
            url: "https://superheroapi.com/api.php/4905856019427443/" + valueInput,
            success: function (data) {
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections["group-affiliation"];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let primeraAparicion = data.biography["first-appearance"];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let aliases = data.biography.aliases;
                let poder = data.powerstats.intelligence;

                // VALIDAR DATOS QUE NO APARECEN
                if (ocupacion == "-") {
                    ocupacion = "No hay ocupación conocida";
                }
                if (conexiones == "-") {
                    conexiones = "No hay conexiones conocidas";
                }
                if (primeraAparicion == "-") {
                    primeraAparicion = "No se tiene registro";
                }
                if (poder == "null") {
                    alert('No hay datos de este héroe.\n NO SE MOSTRARAN ESTADISTICAS')
                }

                // INGRESAR DATOS PARA LA CARD
                $("#cards").html(`
                <div class="container">
                    <h2 class="text-center text-warning mb-4">SuperHero Encontrado</h2>
                    <div class="row align-items-center">
                        <div class="col-8 col-md-8">
                            <div class="card bg-transparent border border-warning border-5 mb-3" style="max-width: 900px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-text fs-2 text-warning fw-bold text-center mb-4">${nombre}</h5>
                                            <div class="row text-white text-start text-align-center">
                                                <div class="col-6 col-md-6">
                                                    <p class="card-text fs-6"><b>CONEXIONES:</b> ${conexiones}.</p>
                                                    <p class="card-text fs-6"><b>FECHA DE PUBLICACION:</b> ${publicado}.</p>
                                                    <p class="card-text fs-6"><b>OCUPACION:</b> ${ocupacion}.</p>
                                                </div>
                                                <div class="col-6 col-md-6">
                                                    <p class="card-text fs-6"><b>PRIMERA APARICION:</b> ${primeraAparicion}.</p>
                                                    <p class="card-text fs-6"><b>ALTURA:<span style="display: inline;">${altura}.</span></p>
                                                    <p class="card-text fs-6"><b>PESO:</b> ${peso}.</p>
                                                    <p class="card-text fs-6"><b>ALIAS:</b> ${aliases}.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-md-4">
                            <div id="heroGrafico" class="grafico border border-warning border-5 rounded" style="height: 360px; width: 100%"></div>    
                        </div>
                    </div>
                </div>
            `);

                // INGRESAR DATOS EN CANVAS JS

                let estadisticas = [];

                estadisticas.push(
                    { y: data.powerstats.intelligence, label: "Inteligencia" },
                    { y: data.powerstats.strength, label: "Fuerza" },
                    { y: data.powerstats.speed, label: "Velocidad" },
                    { y: data.powerstats.durability, label: "Resistencia" },
                    { y: data.powerstats.power, label: "Poder" },
                    { y: data.powerstats.combat, label: "Combate" }
                );

                let config = {
                    theme: "dark2",
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de Poder para ${data.name}`,
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label} - {y}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: estadisticas,
                        },
                    ],
                };
                // RENDERIZAR Y ENVIAR LA INFO
                let chart = new CanvasJS.Chart("heroGrafico", config);
                chart.render();
            },
        });
    });
});