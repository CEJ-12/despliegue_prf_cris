<template>
  <div>
    <section id="isos_portada" class="p-iso9001">
      <h2 class="text-white font text-justify">ISO 9001</h2>
    </section>
    <section id="consultoria_informacion">
      <div class="container">
        <h4 class="text-center font">CERTIFICADO ISO 9001: 2015</h4>
        <p class="font text-justify">
          Implementar la norma ISO 9001:2015 en su empresa tendrá múltiples
          beneficios. No solo ahorrará tiempo, dinero y ganará en eficiencia ya
          que se mejorarán sus procesos de manera destacada. También evitará
          sanciones por incumplimiento de alguna normativa y su imagen
          empresarial mejorará de cara a clientes, proveedores y terceras
          partes. Por ello le recomendamos actualizar a esta versión ISO
          9001:2015.
        </p>
        <h5 class="font text-justify">¿En cuánto tiempo lo obtengo?</h5>
        <p class="font text-justify">
          El tiempo promedio de obtener el certificado ISO 9001:2015, es de seis
          meses, aunque depende de numerosos factores, como su disposición y
          organización para crear el Sistema de Gestión de Calidad o su tamaño.
          En empresas pequeñas de hasta 50 trabajadores la norma puede estar
          implantada en unos cuatro meses. En cambio, las empresas medianas
          necesitan unos ocho meses, mientras que las grandes pueden requerir
          hasta 15 meses.
        </p>
        <h5 class="font text-justify">
          ¿Cuánto tiempo tiene validez el certificado ISO 9001?
        </h5>
        <p class="font text-justify">
          Una vez otorgada, la certificación tiene una validez de tres años,
          trascurrido este periodo es necesaria una auditoría de renovación y la
          emisión de un nuevo certificado. Anualmente la entidad de
          certificación debe realizar auditorías de seguimiento para asegurar el
          cumplimiento de los requisitos de la norma.
        </p>
        <h4 class="font text-justify">BENEFICIOS DEL ISO 9001</h4>
        <p class="font text-justify">
          La implementación de un sistema de gestión de calidad impulsará la
          mejora continua de la empresa, sirviendo de base para la certificación
          de otros estándares:
        </p>
        <ul>
          <li class="font text-justify">
            Permite establecer claramente tus objetivos, alineándolos a la
            estrategia de la organización para identificar nuevas oportunidades
            de negocio.
          </li>
          <li class="font text-justify">
            Asegura el cumplimiento de las necesidades de los clientes para
            superar sus expectativas.
          </li>
          <li class="font text-justify">
            Mantiene metodologías implementadas para identificar y tratar los
            riesgos asociados con tu organización.
          </li>
          <li class="font text-justify">
            Ahorro de recursos e incremento de la satisfacción del personal, al
            tener procesos más eficaces y ordenados.
          </li>
        </ul>
        <div class="redirecciones-iso text-center">
          <a href="consultoria.php">
            <i class="font text-justify"> Consultoria</i>
          </a>
          <span>/</span>
          <a href="iso9001.php"><i class="font text-justify">ISO 9001</i> </a>
          <span>/</span>
          <a href="iso14001.php"><i class="font text-justify"> ISO 14001</i></a>
          <span>/</span>
          <a href="iso37001.php"><i class="font text-justify"> ISO 37001</i></a>
          <span>/</span>
          <a href="iso45001.php"><i class="font text-justify"> ISO 45001</i></a>
        </div>
      </div>
    </section>
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

#isos_portada {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  height: 500px;
  width: 100%;
}

.p-iso9001 {
  background-image: url(../../../assets/portada-iso9001.webp);
}
</style>
