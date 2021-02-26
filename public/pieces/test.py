import os
os.chdir("public/pieces")
for x in os.listdir():
    print("import " + x[:-4] + " from " + '"' + x + '"')