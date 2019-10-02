import {Component, ElementRef, OnInit} from '@angular/core';
import {D3, D3Service, Selection} from 'd3-ng2-service';
import * as d3 from 'd3';


function treeify(source: string) {
  const parents = [];
  const nodes = source.trim().split(/\n/g);
  parents.push({children: []});
  for (let i = 0, n = nodes.length; i < n; ++i) {
    const depth = nodes[i].match(/^\t*/)[0].length;
    const parent = parents[depth];
    if (!parent.children) parent.children = [];
    parent.children.push(parents[depth + 1] = {name: nodes[i].slice(depth)});
  }
  return parents[0];
}

function color(data) {
  return d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
}

@Component({
  selector: 'app-chart-renderer',
  templateUrl: './chart-renderer.component.html',
  styleUrls: ['./chart-renderer.component.scss']
})
export class ChartRendererComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  data = treeify(`
Fearful
	Scared
		Helpless
		Frightened
	Anxious
		Overwhelmed
		Worried
	Insecure
		Inadequate
		Inferior
	Weak
		Worthless
		Insignificant
	Rejected
		Excluded
		Persecuted
	Threatened
		Nervous
		Exposed
Angry
	Let down
		Betrayed
		Resentful
	Humiliated
		Disrespected
		Ridiculed
	Bitter
		Indignant
		Violated
	Mad
		Furious
		Jealous
	Aggressive
		Provoked
		Hostile
	Frustrated
		Infuriated
		Annoyed
	Distant
		Withdrawn
		Numb
	Critical
		Skeptical
		Dismissive
Disgusted
	Disapproving
		Judgmental
		Embarrassed
	Disappointed
		Appalled
		Revolted
	Awful
		Nauseated
		Detestable
	Repelled
		Horrified
		Hesitant
Sad
	Hurt
		Embarrassed
		Disappointed
	Depressed
		Inferior
		Empty
	Guilty
		Remorseful
		Ashamed
	Despair
		Powerless
		Grief
	Vulnerable
		Fragile
		Victimized
	Lonely
		Abandoned
		Isolated
Happy
	Optimistic
		Inspired
		Hopeful
	Trusting
		Intimate
		Sensitive
	Peaceful
		Thankful
		Loving
	Powerful
		Creative
		Courageous
	Accepted
		Valued
		Respected
	Proud
		Confident
		Successful
	Interested
		Inquisitive
		Curious
	Content
		Joyful
		Free
	Playful
		Cheeky
		Aroused
Surprised
	Excited
		Energetic
		Eager
	Amazed
		Awe
		Astonished
	Confused
		Perplexed
		Disillusioned
	Startled
		Dismayed
		Shocked
Bad
	Tired
		Unfocused
		Sleepy
	Stressed
		Out of control
		Overwhelmed
	Busy
		Rushed
		Pressured
	Bored
		Apathetic
		Indifferent
`);

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    const d3inst = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;

    const width = 932;
    const radius = width / 2;

    function partition(data: any) {
      return d3.partition()
        .size([2 * Math.PI, radius])
        (d3.hierarchy(data).count());
    }

    if (this.parentNativeElement !== null) {

      d3ParentElement = d3inst.select(this.parentNativeElement); // <-- use the D3 select method
      const svg = d3ParentElement.select<SVGSVGElement>('svg')
        .style('width', '932px')
        .style('height', '932px')
        .style('position', 'relative')
        .style('top', '30px')
        .style('left', 'calc(50% - 466px)')
        .style('font', '10px sans-serif');

      const root = partition(this.data);

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${width / 2})`);

      const arcFunc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(466 / 2)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1 - 1);

      g.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('path')
        .data(root.descendants().slice(1))
        .enter().append('path')
        .attr('fill', (d) => {
          while (d.depth > 1) {
            d = d.parent;
          }

          const dd: any = d;

          return this.getColor(dd.data.name);
        })
        .attr('d', arcFunc)
        .on('click', function (event: any) {
          console.log(event);
        });


      g.append('g')
        .attr('pointer-events', 'none')
        .attr('text-anchor', 'middle')
        .selectAll('text.txt')
        .data(root.descendants().slice(1))
        .enter().append('text.txt')
        .attr('transform', function (d) {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr('dy', '0.35em')
        .text(d => {

          const dd: any = d;

          return dd.data.name;
        });

      return svg.node();
    }
  }

  getColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  clicked(event) {
    d3.select(event.target).style('stroke-width', '1');
    d3.select(event.target).style('stroke', 'rgb(0, 0, 0)');
  }
}
