/** 
 *  jimting
 *  https://github.com/jimting
 */
var app = new Vue({
    el: "#app",
    data: {
        fileSrc:null,
        title: "年號",
        list: [
        ],
        newListItem:"",
        paddLeft:0,
		paddUp:0,
        color:{
            bak:{r:45,g:45,b:45},
            title:{r:0,g:0,b:0},
            list:{r:200,g:200,b:200}
        },
        size:{
            title:200,
            list:22
        }
    },
    updated: function () {
        this.draw();
    },
    created:function(){
        this.$nextTick(function(){
            this.draw();
        })
    },
    methods: {
        onBlur:function(index){
            if(this.list[index]==''){
                this.list.splice(index,1);
            }
        },
        onNewItem:function(){
            if(this.newListItem!=''){
                this.list.push(this.newListItem);
                this.newListItem="";
            }
        },
        filesChange:function(file){
            var self=this;
            var fr = new FileReader();
            fr.onload=function(){
                self.fileSrc=this.result;
                self.draw();
            }
            fr.readAsDataURL(file[0]); 
        },
        draw: function () {
            var ctx=this.$el.querySelector("#canvas").getContext("2d");
            var self = this;
            ctx.fillStyle = "rgb("+this.color.bak.r+","+this.color.bak.g+","+this.color.bak.b+")";
            ctx.fillRect(0, 0, 1358, 600);

            var img = new Image();
			img.src = "./resource/jp.jpg"
            img.onload = function () {
                
                ctx.drawImage(img, 0, 0, img.width,img.height );
                self.drawText(ctx);
            }
        },
        drawText: function (ctx) {
            let padding=new Number(this.size.title)*0.55
            ctx.fillStyle = "rgb("+this.color.title.r+","+this.color.title.g+","+this.color.title.b+")";
            ctx.font = ''+this.size.title+'px 行書';
            ctx.textAlign = 'center';
			title = this.title.replace(" ", "\n");
			x = 370+parseInt(this.paddLeft);
			y = 70 + parseInt(this.paddUp);
			nextY = 2*padding;
			for(var i = 0; i < this.title.length;i++)
			{
				y = y+nextY;
				ctx.fillText(this.title[i], x, y);
			}
        }
    }
})