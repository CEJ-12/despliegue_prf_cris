const useStoreLanguage = {
    state: {
        idiomaSeleccionado: 2
    },
    mutations: {
        cambiarIdioma(state, nuevoIdioma){
            state.idiomaSeleccionado = nuevoIdioma
        }
    },
    actions: {
        seleccionarIdioma({ commit }, nuevoIdioma){
            commit('cambiarIdioma',nuevoIdioma)
            window.location.reload();
        }
    }
}
export default useStoreLanguage