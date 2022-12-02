import mysql.connector 

def dbfun():
    mydb = mysql.connector.connect(
        host="testdb.cergfpiaziwa.us-east-1.rds.amazonaws.com",
        user="admin",
        password="12345678",
        database="covid19",
        auth_plugin="mysql_native_password"

    )
    print("Connected to database")
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS covid19;")
    mycursor.execute("USE covid19;")
     
    mycursor.execute("CREATE TABLE IF NOT EXISTS covid_details (statename VARCHAR(255), dateofrecord date,numofsamples int(11),numofdeaths int(11),numofpos int(11),numofneg int(11),numofdis int(11))")

    mycursor.execute("SHOW TABLES")
    customQuery = "Insert into covid_details (statename, dateofrecord, numofsamples,numofdeaths,numofpos,numofneg,numofdis) values ('kerala','2018-10-20',12,8,5,3,2)"
    mycursor.execute(customQuery);
    for x in mycursor:
        print(x)


dbfun()