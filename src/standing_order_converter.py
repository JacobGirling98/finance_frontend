import json

csv = """
next_date,frequency,date,outgoing,value,transaction_type,outbound_account,inbound_account,destination,source,description,category,quantity,id
2023-05-01,monthly,,True,5.0,Bank Transfer,,,Parents,,Spotify,Spotify,1,6f09fde4-5e0c-11ed-b9b9-7085c274d271
2023-04-16,monthly,,False,200.0,Personal Transfer,Current,Help to Buy ISA,,,Help to Buy ISA,Savings,1,6f09fde5-5e0c-11ed-9f6c-7085c274d271
2023-04-21,monthly,,True,10.92,Bank Transfer,,,EE,,Phone Bill,Phone,1,6f09fde6-5e0c-11ed-80d7-7085c274d271
2023-04-15,monthly,,True,6.07,Bank Transfer,,,Nationwide,,Home Insurance,Insurance,1,6f09fde7-5e0c-11ed-b482-7085c274d271
2023-05-01,monthly,,True,13.0,Debit,,,,,Water Bill,Water,1,6f09fde8-5e0c-11ed-81b2-7085c274d271
2023-04-18,monthly,,True,815.0,Debit,,,,,Rent,Rent,1,6f09fdeb-5e0c-11ed-a07c-7085c274d271
2023-04-18,monthly,,True,5.0,Debit,,,,,TV License,TV License,1,6f09fdec-5e0c-11ed-a92b-7085c274d271
2023-04-13,monthly,,True,23.62,Debit,,,,,Flat Internet,Internet,1,6f09fded-5e0c-11ed-891e-7085c274d271
2023-04-28,monthly,,False,200.0,Personal Transfer,Current,Regular Saver,,,Regular Saver,Savings,1,6f09fdee-5e0c-11ed-832f-7085c274d271
2023-05-04,monthly,,True,25.99,Debit,,,,,Gym,Health,1,6f09fdef-5e0c-11ed-a5c3-7085c274d271

"""

lines = csv.splitlines()

orders = []

def resolve(value):
  if (value):
    if (value == "True" or value == "False"):
      return value == "True"
    elif (value.isdigit()):
      return int(value)
    elif (value.replace(".", "", 1).isdigit()):
      return float(value)
    return value
  else:
    return None

for l in lines[2:-1:]:
  line = l.split(",")
  order = {
    "nextDate": resolve(line[0]),
    "frequency": resolve(line[1]),
    "outgoing": resolve(line[3]),
    "value": resolve(line[4]),
    "transactionType": resolve(line[5]),
    "description": resolve(line[10]),
    "category": resolve(line[11]),
    "quantity": resolve(line[12]),
    "id": resolve(line[13])
  }
  if resolve(line[6]):
    order["outboundAccount"]: resolve(line[6])
  if resolve(line[7]):
    order["inboundAccount"]: resolve(line[7])
  if resolve(line[8]):
    order["destination"]: resolve(line[8])
  if resolve(line[9]):
    order["source"]: resolve(line[9])
  orders.append(order)

with(open("standing-orders.json", "w")) as file:
  file.write(json.dumps(orders))
