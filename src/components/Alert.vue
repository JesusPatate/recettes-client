<template>
    <div class="modal" :class="{'is-active': !!message}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="level">
                    <div class="level-item">
                        {{message}}
                    </div>
                </div>
                <div class="level">
                    <div class="control">
                        <div class="control">
                            <button class="button is-link" @click="validate">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: String
        },

        methods: {
            validate() {
                this.$emit('validate');
            }
        }
    }
</script>