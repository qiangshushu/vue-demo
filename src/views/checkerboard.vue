<template>
  <div>
    <canvas ref="checkerboard" @click="yourTurn"></canvas>
    <img ref="white" src="~assets/white.png" alt="" v-show="0">
    <img ref="black" src="~assets/black.png" alt="" v-show="0">
    <button v-if="step > 1" @click="back">上一步</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canvas: null,
        ctx: null,
        cw: 800,
        padding: 40,
        size: 15,
        uw: 0,
        white: null,
        black: null,
        wins: [], //所有的赢法
        points: [], //所有的点
        step: 0, //步骤
        gameover: false
      };
    },
    created() {
      this.uw = (this.cw - this.padding * 2) / (this.size - 1);
    },
    mounted() {
      this.canvas = this.$refs.checkerboard;
      this.canvas.width = this.cw;
      this.canvas.height = this.cw;
      this.ctx = this.canvas.getContext('2d');
      this.white = this.$refs.white;
      this.black = this.$refs.black;
      this.start();
    },
    methods: {
      start() {
        this.wins = [];
        for(let x = 0; x < this.size; x++) {
          for(let y = 0; y < this.size - 4; y++) {
            let s = [];
            for(let k = 0; k < 5; k++) {
              s.push(`${x},${y + k}`);
            }
            this.wins.push(s);
          }
        }

        for(let x = 0; x < this.size - 4; x++) {
          for(let y = 0; y < this.size; y++) {
            let s = [];
            for(let k = 0; k < 5; k++) {
              s.push(`${x + k},${y}`);
            }
            this.wins.push(s);
          }
        }

        for(let x = 0; x < this.size - 4; x++) {
          for(let y = 0; y < this.size - 4; y++) {
            let s = [];
            for(let k = 0; k < 5; k++) {
              s.push(`${x + k},${y + k}`);
            }
            this.wins.push(s);
          }
        }

        for(let x = 0; x < this.size - 4; x++) {
          for(let y = this.size - 1; y > 3; y--) {
            let s = [];
            for(let k = 0; k < 5; k++) {
              s.push(`${x + k},${y - k}`);
            }
            this.wins.push(s);
          }
        }

        this.wins = this.wins.map(item => {
          let obj = {};
          item.forEach(i => {
            obj[i] = null;
          });
          return obj;
        });

        this.points = [];
        for(let x = 0; x < this.size; x++) {
          for(let y = 0; y < this.size; y++) {
            this.points.push({ x, y, step: -1, disabled: false, score: 0, bWay: 0, wWay: 0 });
          }
        }

        this.gameover = false;
        this.step = 0;

        this.drawCheckerboard();
      },
      drawCheckerboard() {
        this.ctx.clearRect(0, 0, this.cw, this.cw);
        this.ctx.save();
        this.ctx.translate(this.padding, this.padding);
        this.ctx.beginPath();
        for(let i = 0; i < this.size; i++) {
          this.ctx.moveTo(0, i * this.uw);
          this.ctx.lineTo((this.size - 1) * this.uw, i * this.uw);
          this.ctx.moveTo(i * this.uw, 0);
          this.ctx.lineTo(i * this.uw, (this.size - 1) * this.uw);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
      },
      computeScore() {
        for(let i = 0; i < this.points.length; i++) {
          if(this.gameover) {
            this.start();
            break;
          }
          let p = this.points[i];
          p.bWay = 0;
          p.wWay = 0;
          p.score = 0;
          for(let j = 0; j < this.wins.length; j++) {
            let w = this.wins[j];

            if(w[`${p.x},${p.y}`] !== undefined) {
              let white = Object.values(w).filter(i => i === 1);
              let black = Object.values(w).filter(i => i === 0);

              if(black.length === 5) {
                alert('you win!');
                this.gameover = true;
                break;
              }

              if(white.length === 5) {
                alert('computer win!');
                this.gameover = true;
                break;
              }

              if(!Object.values(w).includes(0)) {
                p.wWay++;
              }
              if(!Object.values(w).includes(1)) {
                p.bWay++;
              }
              // console.log(w, white.length, black.length);
              switch(white.length) {
                case 0:
                  p.score += 11;
                  break;
                case 1:
                  p.score += 220;
                  break;
                case 2:
                  p.score += 4400;
                  break;
                case 3:
                  p.score += 88000;
                  break;
                case 4:
                  p.score += 1760000;
                  break;
                case 5:
                  p.score += 35200000;
                  break;
                default:
                  p.score += 1;
              }

              switch(black.length) {
                case 0:
                  p.score += 10;
                  break;
                case 1:
                  p.score += 200;
                  break;
                case 2:
                  p.score += 4000;
                  break;
                case 3:
                  p.score += 80000;
                  break;
                case 4:
                  p.score += 1600000;
                  break;
                case 5:
                  p.score += 32000000;
                  break;
                default:
                  p.score += 1;
              }
            }
          }
        }

        // this.points.forEach(p => {
        //   this.ctx.fontSize = 20;
        //   this.ctx.textAlign = 'right';
        //   this.ctx.fillStyle = 'black';
        //   this.ctx.fillText(p.bWay + ' ', p.x * this.uw + this.padding, p.y * this.uw + this.padding);
        //   this.ctx.fillStyle = 'red';
        //   this.ctx.fillText(p.wWay + ' ', p.x * this.uw + this.padding, p.y * this.uw + this.padding + 10);
        //   this.ctx.textAlign = 'left';
        //   this.ctx.fillStyle = 'red';
        //   this.ctx.fillText(' ' + p.score, p.x * this.uw + this.padding, p.y * this.uw + this.padding + 10);
        // });
        // console.log('points', this.points);
      },
      yourTurn(e) {
        let x = Math.round((e.layerX - this.padding) / this.uw);
        let y = Math.round((e.layerY - this.padding) / this.uw);
        if(this.points[x * this.size + y].disabled) {
          return false;
        }
        this.wins.forEach(w => {
          if(w[`${x},${y}`] !== undefined) {
            w[`${x},${y}`] = (this.step % 2);
          }
        });
        this.points[x * this.size + y].disabled = true;
        this.points[x * this.size + y].step = this.step++;

        this.drawCheckerboard();
        this.drawPoints();
        this.computerTurn();
      },
      computerTurn() {
        let point = this.points.filter(item => !item.disabled).max('score');
        console.log(this.points, point);
        let x = point.x;
        let y = point.y;
        this.wins.forEach(w => {
          if(w[`${x},${y}`] !== undefined) {
            w[`${x},${y}`] = (this.step % 2);
          }
        });
        this.points[x * this.size + y].disabled = true;
        this.points[x * this.size + y].step = this.step++;
        this.drawCheckerboard();
        this.drawPoints();
      },
      drawPoints() {
        this.points.filter(item => item.disabled).forEach(item => {
          let x = item.x * this.uw + this.padding;
          let y = item.y * this.uw + this.padding;
          this.ctx.drawImage(item.step % 2 ? this.white : this.black, x - this.uw / 2, y - this.uw / 2, this.uw, this.uw);
        });
        this.computeScore();
      },
      back() {
        Object.assign([], this.points).sort((a, b) => a.step > b.step).slice(-2).forEach(item => {
          this.wins.forEach(w => {
            if(w[`${item.x},${item.y}`] !== undefined) {
              w[`${item.x},${item.y}`] = null;
            }
          });
          item.disabled = false;
          item.step = -1;
        });
        this.drawCheckerboard();
        this.drawPoints();
      }
    }
  };
</script>
