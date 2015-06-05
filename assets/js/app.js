$(function(){return window.Die=function(){function t(t){this.numSides=t,this.history=[]}return t.prototype.roll=function(){var t;return t=Math.floor(Math.random()*this.numSides)+1,this.history.push(t),t},t.prototype.recentRolls=function(){return this.history.slice(-20,-1)},t}()}),$(function(){return window.Board=function(){function t(t,i,e){var s;this.players=t,this.die=i,this.context=e,this.currentPlayer=3,this.again=!1,this.track=function(){var t,i;for(i=[],s=t=0;51>=t;s=++t)i.push(null);return i}(),this.doors=[50,24,11,37],this.starts=[0,26,13,39],this.houses=[[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]],this.reserves=[4,4,4,4],this.goals=[0,0,0,0]}return t.prototype.checkEnd=function(){return-1!==this.goals.indexOf(4)},t.prototype.move=function(t){return this.again||(this.currentPlayer=(this.currentPlayer+1)%4),this.again=!1,this.players[this.currentPlayer].move(this),t.draw()},t.prototype.goAgain=function(){return this.again=!0},t.prototype.returnPiece=function(t){var i;return i=this.track[t],this.reserves[i]++,this.track[t]=null},t.prototype.deliverPiece=function(t){return this.goals[t]++},t}()}),$(function(){return window.Player=function(){function t(t,i){this.id=t,this.name=i}return t.prototype.hasStart=function(t){return t.reserves[this.id]>0},t.prototype.hasExposed=function(t){return-1!==t.track.indexOf(this.id)},t.prototype.hasHoused=function(t){return-1!==t.houses[this.id].indexOf(this.id)},t.prototype.start=function(t){return this.hasStart(t)?(t.reserves[this.id]-=1,null!=t.track[t.starts[this.id]]&&t.returnPiece(t.starts[this.id]),t.track[t.starts[this.id]]=this.id):void 0},t.prototype.advance=function(t,i,e,s){var n,o,r;if(n=i+e,s&&(console.log("Moving from "+i+" to "+n+" in house!"),5===n?(t.deliverPiece(this.id),t.houses[this.id][i]=null):5>n&&null==t.houses[this.id][n]&&(t.houses[this.id][i]=null,t.houses[this.id][n]=this.id)),t.track[i]===this.id)if(o=t.doors[this.id],i===o||o>i&&i+e>o){if(r=e-(o-i)-1,null==t.houses[this.id][r])return t.track[i]=null,t.houses[this.id][r]=this.id}else if(n=(i+e)%52,t.track[n]!==this.id)return null!=t.track[n]&&t.returnPiece(n),t.track[i]=null,t.track[n]=this.id},t.prototype.move=function(t){var i,e;return e=t.die.roll(),console.log("rolled a "+e),6===e?(this.start(t),t.goAgain()):this.hasExposed(t)?(i=t.track.indexOf(this.id),this.advance(t,i,e,!1)):this.hasHoused(t)?(i=t.houses[this.id].indexOf(this.id),this.advance(t,i,e,!0)):console.log("Do Nothing")},t}()}),$(function(){return window.BoardView=function(){function t(t,i){this.context=t,this.board=i,this.window_padding_top=30,this.window_padding_right=30,this.window_padding_bottom=30,this.window_padding_left=30,this.space_radius=10,this.space_padding_right=5,this.space_padding_bottom=5,this.goal_width=40,this.goal_height=30,this.h_text_offset=4,this.v_text_offset=5,this.line_height=20,this.tab_width=20,this.todolist_width=300,this.colors={background:"#FFFFFF",space:"#000000",text:"#000000",players:["#FF0000","#00FF00","#00AAFF","#FFFF00"]}}return t.prototype.space_height=function(){return 2*this.space_radius},t.prototype.token_radius=function(){return this.space_radius-2},t.prototype.drawCircle=function(t,i,e,s){return this.context.fillStyle=s,this.context.beginPath(),this.context.arc(t,i,e,0,2*Math.PI),this.context.fill()},t.prototype.clearScreen=function(){return this.context.fillStyle=this.colors.background,this.context.fillRect(0,0,window.innerWidth,window.innerHeight)},t.prototype.drawTrack=function(){var t,i,e,s,n,o,r,h,d,a;for(d=this.space_height()+this.space_padding_right,h=i=0;51>=i;h=++i)a=h*d+this.window_padding_left,this.drawCircle(a,this.window_padding_top,this.space_radius,this.colors.space);for(o=this.board.track,r=[],h=e=0,s=o.length;s>e;h=++e)n=o[h],null!=n?(t=this.colors.players[n],a=h*d+this.window_padding_left,r.push(this.drawCircle(a,this.window_padding_top,this.token_radius(),t))):r.push(void 0);return r},t.prototype.drawReserves=function(){var t,i,e,s,n,o,r,h,d,a,l;for(r=this.space_height()+this.space_padding_right,d=this.window_padding_top+this.space_height()+this.space_padding_bottom,l=d+this.space_radius/2,s=this.board.starts,n=[],e=t=0,i=s.length;i>t;e=++t)o=s[e],h=o*r+this.window_padding_left,this.drawCircle(h,d,this.space_radius,this.colors.players[e]),a=o*r+this.window_padding_left-this.h_text_offset,this.context.fillStyle=this.colors.text,n.push(this.context.fillText(this.board.reserves[e],a,l));return n},t.prototype.drawHouses=function(){var t,i,e,s,n,o,r,h,d,a,l,c,u,p,w,_,g,f,y,x;for(g=this.space_height()+this.space_padding_right,_=this.space_height()+this.space_padding_bottom,c=this.board.doors,p=[],l=s=0,o=c.length;o>s;l=++s){for(h=c[l],d=h*g+this.window_padding_left,u=this.board.houses[l],w=n=0,r=u.length;r>n;w=++n)a=u[w],f=w*_+this.window_padding_top+this.space_height()+this.space_padding_bottom,e=this.colors.players[l],this.drawCircle(d,f,this.space_radius,e),e=null!=a?this.colors.players[a]:this.colors.space,this.drawCircle(d,f,this.token_radius(),e);t=h*g+this.window_padding_left-this.goal_width/2,i=this.window_padding_top+7*this.space_height(),y=t+this.goal_width/2-this.h_text_offset,x=i+this.goal_height/2+this.h_text_offset,4===this.board.goals[l]?(this.context.fillStyle=this.colors.players[l],this.context.fillRect(t,i,this.goal_width,this.goal_height)):(this.context.strokeStyle=this.colors.players[l],this.context.strokeRect(t,i,this.goal_width,this.goal_height)),this.context.fillStyle=this.colors.text,p.push(this.context.fillText(this.board.goals[l],y,x))}return p},t.prototype.drawDie=function(){var t,i,e,s;return t=this.colors.players[this.board.currentPlayer],e=this.window_padding_left,s=window.innerHeight-this.window_padding_bottom,this.drawCircle(e,s,this.space_radius,t),i=this.board.die.history.splice(-1),this.context.fillStyle=this.colors.text,e=this.window_padding_left-this.h_text_offset,s=window.innerHeight-this.window_padding_bottom+this.v_text_offset,this.context.fillText(i,e,s),e+=this.space_height()+this.space_padding_right,this.context.fillText("Space to move, p to toggle play",e,s)},t.prototype.drawTodoList=function(){var t,i,e,s,n,o,r,h,d;for(r=["Find all current active pieces","Expose Decision Points","Create Strategies","Highlight last move (arrows maybe?)"],h=window.innerWidth-(this.todolist_width+this.window_padding_right),d=window.innerHeight-(this.window_padding_bottom+(r.length+1)*this.line_height),this.context.fillText("Todo List:",h-this.tab_width,d),o=[],n=i=0,s=r.length;s>i;n=++i)e=r[n],t=r.length-n,d=window.innerHeight-(this.window_padding_bottom+t*this.line_height),o.push(this.context.fillText(e,h,d));return o},t.prototype.draw=function(){return this.clearScreen(),this.context.font="12pt serif",this.drawTrack(),this.drawReserves(),this.drawHouses(),this.drawDie(),this.drawTodoList()},t}()}),$(function(){var t,i,e,s,n,o,r,h,d,a,l;return e=document.getElementById("board"),s=e.getContext("2d"),o=new Player(0,"Fred"),r=new Player(1,"Fred"),h=new Player(2,"Fred"),d=new Player(3,"Fred"),n=new Die(6),i=new Board([o,r,h,d],n,s),l=new BoardView(s,i),t=null,a=function(){return e.width=window.innerWidth,e.height=window.innerHeight,l.draw()},window.addEventListener("resize",a,!1),a(),window.move=function(){return i.move(l),i.checkEnd()?(window.clearInterval(t),t=null):void 0},window.displayHouses=function(){return console.log(i.houses)},$(window).on("keyup",function(i){return 32===i.which?window.move():80===i.which?(console.log("p pressed"),null==t?t=window.setInterval(move,20):(window.clearInterval(t),t=null)):void 0})});