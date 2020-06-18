export default {
    data() {
        return {
            showPopoverId: '',
            activeAllTitle: false,
            visible: false
        }
    },
    methods: {

    },
    created() {
        const that = this
        document.getElementById('app').addEventListener(
            'click',
            function (e) {
                that.showPopoverId = ''
                that.visible = false
                that.activeAllTitle = false
            },
            false
        )
    },
    beforeDestroy() {
        const that = this
        document.getElementById('app').removeEventListener(
            'click',
            function (e) {
                that.showPopoverId = ''
                that.visible = false
                that.activeAllTitle = false
            },
            false
        )
    }
}
