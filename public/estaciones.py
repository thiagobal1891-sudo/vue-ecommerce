mes = int(input("Dame un mes (1-12): "))

if 1 <= mes <= 12:
    if 1 <= mes <= 3:
        print("Verano.") # En Uruguay, enero a marzo es verano
    elif 4 <= mes <= 6:
        print("Otoño.") # Abril a junio es otoño
    elif 7 <= mes <= 9:
        print("Invierno.") # Julio a septiembre es invierno
    elif 10 <= mes <= 12:
        print("Primavera.") # Octubre a diciembre es primavera
else:
    print(f"Ningún año tiene {mes} meses. Por favor, introduce un número del 1 al 12.")