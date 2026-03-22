let t = 0;

const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Energy', data: [] }] },
    options: { animation: false, scales: { y: { min: -2, max: 2 } } }
});

function val(id){ return document.getElementById(id).value; }

function update(){
    fetch(`/simulate?t=${t}&A=${val('A')}&omega=${val('omega')}&phi=0&B=${val('B')}&D=${val('D')}&threshold=${val('threshold')}`)
    .then(r=>r.json())
    .then(d=>{
        chart.data.labels.push(t.toFixed(1));
        chart.data.datasets[0].data.push(d.E);

        if(chart.data.labels.length>50){
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.update();

        document.getElementById("stateDisplay").innerText =
            d.state===1 ? "⚡ ACTIVATED (1)" : "State: 0";

        particles.forEach(p=>{
            p.position.y += d.E * 0.05;
            if(d.state===1){
                p.material.color.set(0xff0000);
                p.scale.set(1.5,1.5,1.5);
            } else {
                p.material.color.set(0x00ffcc);
                p.scale.set(1,1,1);
            }
        });

        t += 0.1;
    });
}

setInterval(update,100);
