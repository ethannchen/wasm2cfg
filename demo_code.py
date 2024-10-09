def add_numbers(a, b):
    return a + b


# Main program
x = 5
y = 10

if x > 0:
    y = x + 1
else:
    y = x - 1

for i in range(3):
    y += i

while y < 20:
    y += 2

z = add_numbers(x, y)

print(f"Result: {z}")
