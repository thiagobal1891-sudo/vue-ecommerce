from math import sqrt


a = float(input("Valor de a: "))
b = float(input("Valor de b: "))
c = float(input("Valor de c: "))


discriminante = b**2 - 4*a*c

if a == 0:
    if b == 0:
        if c == 0:
            print("La ecuación tiene infinitas soluciones.")
        else:
            print("La ecuación no tiene solución.")
    else:
        x = -c / b
        print(f"Solución de la ecuación lineal: x={x: .2f}")

else:
    if discriminante >= 0:
        x1 = (-b + sqrt(discriminante)) / (2 * a)
        x2 = (-b - sqrt(discriminante)) / (2 * a)

        if discriminante == 0:
            print(f"La ecuación tiene una única solución real: x={x1: .2f}")
        else:
            print(f"Soluciones de la ecuación: x1={x1: .2f} y x2={x2: .2f}")
    else:
        print("La ecuación no tiene soluciones reales (tiene soluciones complejas).")