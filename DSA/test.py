boxes =[[4,5,3],[2,3,2],[3,6,2],[1,5,4],[2,4,1],[1,2,2]]
boxes.sort(key=lambda x:x[0])
heights = {box:box[2] for box in boxes}