export default function onDraw() {
    this.tbody
        .selectAll('tr')
        .selectAll('td')
        .style('text-align', d => (d.text.color ? 'center' : null))
        .text('')
        .append('span')
        .attr('class', d => (d.text.color ? 'w3-badge w3-' + d.text.color : 'label'))
        .append('a')
        .text(d => d.text.text)
        .attr('title', d => d.text.title)
        .attr('href', d => d.text.link);
}
