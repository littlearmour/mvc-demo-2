class Model {
    constructor(options) {
        ['data','update','create','delete','get'].forEach((key)=>{
            if(key in options){
                this[key]=options[key]
            }
        })
        // this.data = options.data
        // this.update=options.update
        // this.create=options.create
        // this.delete=options.delete
        // this.get =options.get
    }

    create() {
        console && console.error && console.error('你还没实现create')
    }

    delete() {
        console && console.error && console.error('你还没实现delete')
    }

    update() {
        console && console.error && console.error('你还没实现update')
    }

    get() {
        console && console.error && console.error('你还没实现get')

    }
}
export default Model