import app as flask_app

with flask_app.app.test_client() as client:
    response = client.post('/chat', json={'message': 'biaya kelas'})
    print(response.status_code)
    print(response.get_data(as_text=True))
