<template>
	<div class="row px-3">
		<div class="col-12 text-center py-10" v-if="certificates.length == 0">
			<strong>{{ $t('message.you_do_not_have_certificates') }}</strong>
		</div>
		<template v-else>
			<div class="col-12 col-md-4 order-2 order-md-1">
				<div class="card py-1">
					<div class="card-body">
						<p class="card-title"> <strong>
								{{ $t('message.list_of_certificates') }}
							</strong> </p>
					</div>
				</div>
				<div class="overflow-auto" style="height: calc(100vh - 190px);">
					<div v-for="certificate in certificates" :key="certificate.id">
						<div class="card py-1 pointer" @click="showCertificate(certificate)">
							<div class="col-md-12 row">
								<div class="col-4 mx-auto text-center d-flex align-items-center">
									<img class="img-thumbnail" :src=certificate.path v-loading-spinner>
								</div>
								<div class="col-8 px-1">
									<div class="card-body">
										<p class="card-title"> <strong>{{ certificate.name_certificate }}</strong> </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-8 order-1 order-md-2 grid">
				<div v-if="waitSelection">
					<div class="text-center py-10">
						[ {{ $t('message.select_a_certificate') }} ]
					</div>
				</div>
				<div v-else>
					<v-overlay :absolute="true" :value="overlay"></v-overlay>
					<img :src=certificateSelected.path class="img-thumbnail" v-loading-spinner>
					<div class="text-center">
						<button type="button" class="btn btn-warning" id="button" @click="download('pdf')">
							<i></i>
							{{ $t('message.download') }} Pdf
						</button>
						<button type="button" class="btn btn-warning" id="button" @click="download('png')">
							<i></i>
							{{ $t('message.download') }} Png
						</button>
					</div>

				</div>
			</div>
		</template>
		<v-snackbar v-model="snackbar" v-if="snackbar!=true">
			<p class="text m-0 p-0" style="color:aliceblue">{{ $t('message.error_certificcate') }}</p>
			<template v-slot:action="{ attrs }">
				<v-btn color="red" v-bind="attrs" @click="snackbar = false">
					x
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>
<script>
export default {
	data() {
		return {
			certificates: [],
			waitSelection: true,
			certificateSelected: [],
			snackbar: false,
			overlay: false
		}
	},
	methods: {
		async getCertificates() {
			await this.$axios.post(`/sst-clients/user/get-certificates`).then((response) => {
				this.certificates = response.data;
			})
		},
		showCertificate(certificate) {
			this.certificateSelected = certificate;
			this.waitSelection = false;
		},
		async download(type) {
			try {
				this.overlay = true;
				const response = await this.$axios({
					url: `/public/sstclient/download-certificate?id=${this.certificateSelected.id}&type=${type}`,
					method: 'GET',
					responseType: 'blob'
				});

				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				if (type === 'png') {
					link.setAttribute('download', 'Certificado.png');
				}else{
					link.setAttribute('download', 'Certificado.pdf');
				}
				
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);

				this.snackbar = true;
			} catch (error) {
				console.log({ error })
				this.snackbar = true;
			} finally {
				this.overlay = false;
			}

		}
	},
	mounted() {
		this.getCertificates();
	}
}
</script>

<style>
.pointer {
	cursor: pointer
}

.d-grid {
	display: grid;
}

.place-center {
	place-items: center;
}
</style>