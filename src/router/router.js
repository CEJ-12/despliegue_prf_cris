import Vue from 'vue'
import VueRouter from 'vue-router'

import UserProfile from '../views/content/perfil/Perfil.vue'
// import pruebasCourse from '../components/auth/course/descripcion/pruebas/pruebasCourse.vue'
// import DinamicClass from '../components/course/descripcion/dinamics/view/DinamicClass.vue'
// import Buy from '../views/content/buy/buy.vue'
// import Search from '../views/content/search/Search.vue'

/**
 * Private routes
 */
const PruebasCourse = () => import('../components/auth/course/descripcion/pruebas/pruebasCourse.vue')
const LoggedInLayout = () => import('../views/LoggedInLayout.vue')
const Academy = () => import('../views/auth/content/Academy.vue')
const Products = () => import('../views/auth/content/Products.vue')
const MyLearning = () => import('../views/auth/content/productorCourses/ProductorCourses.vue')
const Product = () => import('../views/auth/content/Product.vue')
const DiplomadoSupervisorSsoma = () => import('../views/auth/content/DiplomadoSupervisorSsoma.vue')
const Lesson = () => import('../views/auth/content/course/Course.vue')
const Buy = () => import('../views/auth/content/buy/buy.vue')
const Offers = () => import('../views/auth/content/Offers.vue')
const Exams = () => import('../views/auth/content/Exams.vue')
const Certificates = () => import('../views/auth/content/Certificates.vue')
const Calendar = () => import('../views/auth/content/Calendar.vue')



/**
 * Public routes
 */
const PublicLayout = () => import('../views/PublicLayout.vue')
const Login = () => import('../views/public/content/Academy.vue')
const PasswordRecovery = () => import('../views/public/content/PasswordRecovery.vue')
const Home = () => import('../views/public/content/Home.vue')
const Consultancy = () => import('../views/public/content/Consultancy.vue')
const History = () => import('../views/public/content/History.vue')
const AutoLogin = () => import('../views/public/content/AutoLogin.vue')
const CoursePage = () => import('../pages/CoursesPage.vue')
Vue.use(VueRouter)

// const public_routes = ['home', 'consultancy', 'history']

const routes = [
  {
    path: '',
    component: PublicLayout,
    meta: {
      title: ""
    },
    children: [
      { path: '/', component: Home, name: 'home', meta: { title: "- Inicio" }, public: true },
      { path: '/consultoria', component: Consultancy, name: 'consultancy', meta: { title: "- Consultoría" }, public: true },
      { path: '/historia', component: History, name: 'history', meta: { title: "- Historia" }, public: true },
      { path: '/courses', component: CoursePage, name: 'courses-page', meta: { title: "- Cursos" }, public: true},
    ]
  },
  {
    path: '',
    component: LoggedInLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/academia', component: Academy, name: 'academia', meta: { title: "- Academia" } },
      { path: '/productos', component: Products, name: 'productos', meta: { title: "- Productos" } },
      { path: '/mis-cursos/', name: 'myCourses', component: MyLearning, meta: { title: "- Mis cursos" } },
      { path: '/producto/:type/:slug', component: Product, name: 'producto', meta: { title: "- Producto", hasPublicPage: true } },
      { path: '/diplomado-supervisor-ssoma', component: DiplomadoSupervisorSsoma, name: 'beta', meta: { title: "- Diplomado de Supervisor en Seguridad, Salud Ocupacional y Medio Ambiente (SSOMA)", hasPublicPage: true } },
      { path: '/:type/:productSlug/clase/:slug', component: Lesson, name: 'curso', meta: { title: " - Video", hasPublicPage: false } },
      { path: '/examen/:slug/examen/:id', component: PruebasCourse, name: 'test', meta: {title: " - Producto"} },
      // { path: '/course-user/dinamic/:id', component: DinamicClass, name: 'dinamic' },
      { path: '/perfil', name: 'profile', component: UserProfile, meta: { title: "- Perfil" } },
      // { path: '/buy/:ide', name: 'buy', component: Buy },
      { path: '/:slug/pay', name: 'buy', component: Buy },
      { path: '/ofertas/:slug', component: Offers, name: 'oferta', meta: { title: "- Ofertas" }},
      // { path: '/course/search/', name: 'search', component: Search },
      { path: '/mode/:mode/:productSlug/clase/:slug', component: Lesson, name: 'preview', meta: { title: "- Previsualización"}},
      { path: '/mode/:mode/examen/:slug/examen/:id', component: PruebasCourse, name: 'previewTest', meta: {title: " - Previsualización"}},
      { path: '/examenes', component: Exams, name: 'exams', meta: { title: "- Exámenes" }},
      { path: '/certificates', component: Certificates, name: 'certificates', meta: { title: "- Certificados" }},
      { path: '/calendar', component: Calendar, name: 'calendar', meta: { title: "- Calendario" }},
    ]

  },
  { path: '/iniciar-sesion', component: Login, name: 'login', meta: { title: "- Iniciar sesión" } },
  { path: '/contrasena', component: PasswordRecovery, name: 'passwordrecovery', meta: { title: "- Recuperar Contraseña" } },
  { path: '/redirect/:value', component: AutoLogin, name: 'autoLogin'},
]

const router = new VueRouter({
  saveScrollPosition: true,
  mode: 'history',
  routes
})

function validateUndefinedRoutes(from, to, next) {
  if (from.name === undefined || from.name == null  && to.path === "/login") {
    next('/academia');
  }

  if (from.name === undefined) {
    localStorage.clear()
    localStorage.setItem("showPrivateNavbar", false);
    localStorage.setItem("showPublicNavbar", true);
    localStorage.setItem("showPublicFooter", true);
  }
}
function validateComeFromHome(to) {
  if (to.name == "academia") {
    localStorage.setItem("showPrivateNavbar", true);
    localStorage.setItem("showPublicNavbar", false);
    localStorage.setItem("showPublicFooter", false);
  }
}

function validateUserIsLogged(to, from, next) {
  if (localStorage.getItem('access_token')) {
    next()
  } else {
    // Buscar si la ruta tiene una vista publica user is not authenticated
    if (to.meta.hasPublicPage) {
      next()
    } else {
      next('/iniciar-sesion');
    }

  }
}

function checkIfUserComesFromHome(to, from, next) {
  if (to.path == '/iniciar-sesion') {
    if (localStorage.getItem('access_token')) {
      next('/academia');
    } else {
      next();
    }
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} ${to.meta.title}`;
  validateUndefinedRoutes(from, to, next);
  validateComeFromHome(to)

  let route_require_auth = to.matched.some(record => record.meta.requiresAuth)

  if (route_require_auth) {
    validateUserIsLogged(to, from, next)
  } else {
    checkIfUserComesFromHome(to, from, next)
  }
});

export default router
