<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        async start(){
            var obj = JSON.parse(this.$route.params.value);
            const form = {
                "email": obj[0],
                "password": obj[1]
            }
            try {
                const { status, data: response } = await this.$axios.post(
                "/public/auth/login/redirect",
                form
                );
                if (status === 200) {
                    const { data } = await response;
                    const { access_token, user } = await data;
                    localStorage.setItem("id_user", user.id);
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("name_user", user.name);
                    localStorage.setItem("email_user", user.email);
                    localStorage.setItem("mode", "private");
                    localStorage.setItem("showPrivateNavbar", true);
                    localStorage.setItem("showPublicNavbar", false);
                    localStorage.setItem("showPublicFooter", false);

                    if(obj[2] == 'course_intro'){
                        this.$router.push(`/producto/${obj[3]}/${obj[4]}`);
                    }else if(obj[2] == 'purchased_courses'){
                        this.$router.push(`/mis-cursos/`);
                    }else if(obj[2] == 'preview'){
                        var mode = "preview"
                        this.$router.push(`/mode/${mode}/${obj[3]}/clase/${obj[4]}`);
                    }
                }
            } catch (error) {
                console.log(error);
                this.showAlert();
            }
        }
    },
    mounted() {
        this.start();
    },
}
</script>