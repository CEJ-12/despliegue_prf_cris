<template>
    <div class="container mb-4">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active show font text-justify" id="home-tab" data-toggle="tab" href="#home" role="tab"
                    aria-controls="home" aria-selected="true">Descripción</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link font text-justify" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                    aria-controls="profile" aria-selected="false">Valoraciones</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="content font text-justify">
                    Comprender y poseer capacidad crítica de las diferentes relaciones entre condiciones de trabajo y
                    salud.
                    Comprender los métodos experimentales de investigación que sirven de base para la estructuración de
                    las medidas preventivas.
                    Desarrollar las actividades de formación e información a los trabajadores en materia preventiva.
                    Conocer los sistemas de notificación de accidentes de trabajo y enfermedades profesionales, su
                    normativa y su documentación.
                    Conocer y saber interpretar los principales índices estadísticos de siniestralidad y su valoración
                    crítica. </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="content">
                    <h4 class="font text-justify">Valoraciones</h4>
                    <p class="font text-justify">No hay valoraciones</p>
                    <p class="font text-justify">Sé el primero en valorar " Seguridad y Salud en el Trabajo, Sector Construcción”</p>
                    <p class="font text-justify">Tu puntuación *</p>
                    <form>
                        <div class="form-group">
                            <label class="font text-justify">Tu Valoración<span class="text-danger font text-justify">(*)</span></label>
                            <textarea class="form-control font text-justify" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="form-group documento_dni">
                            <label class="font text-justify">Nombres <span class="text-danger font text-justify">(*)</span></label>
                            <input type="text" id="nombre" name="nombre" class="form-control col-lg-4 font text-justify">
                        </div>
                        <div class="form-group">
                            <label class="font text-justify">Correo Electrónico <span class="text-danger font text-justify">(*)</span></label>
                            <input type="email" name="correo" class="form-control col-lg-4 font text-justify">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input font text-justify" id="exampleCheck1">
                            <label class="form-check-label font text-justify" for="exampleCheck1">Guarda mi nombre, correo electrónico y
                                web en este navegador para la próxima vez que comente.</label>
                        </div>
                        <button type="submit" class="btn btn-warning font text-justify">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>

<style>
.font {
    font-family: Roboto !important;
}

.text-justify {
    text-align: justify !important;
}
</style>