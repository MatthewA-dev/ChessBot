f = [2,1,-2,-1]
moves = []

for e in f:
    for i in f:
        if(abs(e) != abs(i)):
            moves.append([e,i])
print(moves)
print(len(moves))