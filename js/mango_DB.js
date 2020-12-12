'use strict'

console.log('Fake database loaded')
const dbMemes = [
    {
        imgId: 5,
        lines: [
            {
                txt: '2nd sprint. 1st Day',
                font: 'impact',
                pos: { x: 100, y: 50, width: 310, height: 420 },
                size: 40,
                strokeWidth: 3,
                strokeColor: '#000000',
                fillColor: '#FFFFFF'
            },
            {
                txt: 'SUCCESS',
                font: 'impact',
                pos: { x: 250, y: 450, width: 190, height: 490 },
                size: 50,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: 'yellow'
            }
        ]
    },
    {
        imgId: 6,
        lines: [
            {
                txt: '2nd Sprint | DAY #2',
                font: 'impact',
                pos: { x: 30, y: 70, width: 310, height: 420 },
                size: 50,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: '#FFFFFF'
            },
            {
                txt: 'MOBILE...',
                font: 'impact',
                pos: { x: 94, y: 410, width: 190, height: 490 },
                size: 70,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: 'yellow'
            }
        ]
    },
    {
        "imgId": 18, "lines": [{ "txt": "2ND SPRINT | DAY #3", "font": "impact", "pos": { "x": 109.79797979797979, "y": 63.63636363636364, "width": 373.1499938964844, "height": 46 }, "size": 46, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#FFFFFF" }, { "txt": "FEATURES...", "font": "impact", "pos": { "x": 21.7777777777778, "y": 402.020202020202, "width": 357.01666259765625, "height": 82 }, "size": 82, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "yellow" }, { "txt": "EVERYWHERE...", "font": "impact", "pos": { "x": 133.19191919191923, "y": 483.8383838383839, "width": 350.8833312988281, "height": 62 }, "size": 62, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#cbffc6" }, { "txt": "💥", "pos": { "x": 350.5757575757576, "y": 332.32323232323233, "width": 60, "height": 60 }, "size": 60 }, { "txt": "🎉", "pos": { "x": 415.3838383838384, "y": 376.7676767676768, "width": 60, "height": 60 }, "size": 60 }, { "txt": "💥", "pos": { "x": 311.3737373737374, "y": 346.4646464646465, "width": 36, "height": 36 }, "size": 36 }, { "txt": "💥", "pos": { "x": 428, "y": 321, "width": 44, "height": 44 }, "size": 44 }]
    },
    {
        imgId: 3,
        lines: [
            {
                txt: 'say something',
                font: 'impact',
                pos: { x: 30, y: 70, width: 310, height: 420 },
                size: 50,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: '#FFFFFF'
            },
            {
                txt: 'ssshhhhhhhh....',
                font: 'impact',
                pos: { x: 194, y: 410, width: 190, height: 490 },
                size: 36,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: 'yellow'
            }
        ]
    },{
        imgId: 13,
        lines: [
            {
                txt: 'Till the end mate',
                font: 'impact',
                pos: { x: 30, y: 70, width: 310, height: 420 },
                size: 50,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: '#FFFFFF'
            },
            {
                txt: 'cheers...',
                font: 'impact',
                pos: { x: 94, y: 410, width: 190, height: 490 },
                size: 70,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: 'yellow'
            }
        ]
    },
];

function getMemesFromDatabase() {
    return dbMemes;
}
