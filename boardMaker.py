import json

file = open("public/BoardJSON.json",'w')
board = {}
order = ["r","n","b","q","k","b","n","r"]
for y in range(8):
    line = {}
    for x in range(8):
        tile = {}
        if(y == 0 or y == 1):
            tile["c"] = "b"
        elif(y == 6 or y == 7):
            tile["c"] = "w"
        else:
            tile["c"] = 0
        if(y == 1 or y == 6):
            tile["p"] = "p"
        if(y == 0 or y == 7):
            tile["p"] = order[x]
        else:
            tile["p"] = 0
        line[str(x)] = tile
    board[str(y)] = line
print(board)
encoder = json.JSONEncoder()
file.write(encoder.encode(board))
file.flush()
file.close()