<template>
    <button class="request-orientation" @click="request" type="button">{{ text }}</button>
</template>

<script>
    export default {
        name: "OrientationPermissionButton",
        props: {
            text: {
                type: String,
                default: "Orientation Permission"
            }
        },
        methods: {
            motionRequest() {
                return new Promise((resolve, reject) => {
                    if (typeof DeviceOrientationEvent.requestPermission === 'function' ) {
                        // iOS 13+

                        DeviceOrientationEvent.requestPermission().then( ( response ) => {

                            if ( response === 'granted' ) {
                                resolve(response)
                            }

                        } ).catch( function ( error ) {
                            console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );
                            reject(error)
                        } );

                    } else {
                        // Other devices
                        resolve()
                    }
                })

            },
            request() {
                this.motionRequest()
                    .then(() => {
                        this.$store.commit('mobile/setOrientationPermission', true)
                        this.$emit('success')
                    })
                    .catch((error) => {
                        this.$emit('fail', error)
                    })
            }
        },
    }
</script>

<style scoped>

</style>
