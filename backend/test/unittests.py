import unittest
import requests


class FetchPointsTests(unittest.TestCase):

    def test_case01(self):
        """
        Provided test case
        """
        # Clear out collection
        url = "http://localhost:3001/api/clear"
        resp = requests.delete(url)

        url = "http://localhost:3001/api/add-transaction"

        data = {"payer": "DANNON", "points": 1000,
                "timestamp": "2020-11-02T14:00:00Z"}
        resp = requests.post(url, json=data)

        data = {"payer": "UNILEVER", "points": 200,
                "timestamp": "2020-10-31T11:00:00Z"}
        resp = requests.post(url, json=data)

        data = {"payer": "DANNON", "points": -200,
                "timestamp": "2020-10-31T15:00:00Z"}
        resp = requests.post(url, json=data)

        data = {"payer": "MILLER COORS", "points": 10000,
                "timestamp": "2020-11-01T14:00:00Z"}
        resp = requests.post(url, json=data)

        data = {"payer": "DANNON", "points": 300,
                "timestamp": "2020-10-31T10:00:00Z"}
        resp = requests.post(url, json=data)

        url = "http://localhost:3001/api/spend-points"
        data = {"points": 5000}
        resp = requests.post(url, json=data)

        url = "http://localhost:3001/api/get-balances"
        resp = requests.get(url)

        expected_result = {
            "DANNON": 1000,
            "UNILEVER": 0,
            "MILLER COORS": 5300
        }
        self.assertEqual(resp.json(), expected_result)

    def test_case02(self):
        """
        Test case where only one user spends points
        """
        # Clear out collection
        url = "http://localhost:3001/api/clear"
        resp = requests.delete(url)

        url = "http://localhost:3001/api/add-transaction"

        data = {"payer": "Kyle", "points": 5000,
                "timestamp": "2020-11-02T14:00:00Z"}
        resp = requests.post(url, json=data)

        url = "http://localhost:3001/api/spend-points"
        data = {"points": 3000}
        resp = requests.post(url, json=data)

        url = "http://localhost:3001/api/get-balances"
        resp = requests.get(url)

        expected_result = {
            "Kyle": 2000
        }
        self.assertEqual(resp.json(), expected_result)

    def test_case03(self):
        """
        Test case where no spending is done
        """
        # Clear out collection
        url = "http://localhost:3001/api/clear"
        resp = requests.delete(url)

        url = "http://localhost:3001/api/add-transaction"

        data = {"payer": "Kyle", "points": 5000,
                "timestamp": "2020-11-02T14:00:00Z"}
        resp = requests.post(url, json=data)

        url = "http://localhost:3001/api/get-balances"
        resp = requests.get(url)

        expected_result = {
            "Kyle": 5000
        }
        self.assertEqual(resp.json(), expected_result)

    def test_case04(self):
        """
        Test case where not enough points are held
        """
        # Clear out collection
        url = "http://localhost:3001/api/clear"
        resp = requests.delete(url)

        url = "http://localhost:3001/api/add-transaction"

        data = {"payer": "Kyle", "points": 500,
                "timestamp": "2020-11-02T14:00:00Z"}
        resp = requests.post(url, json=data)

        data = {"payer": "John", "points": 500,
                "timestamp": "2020-11-02T14:00:00Z"}
        resp = requests.post(url, json=data)

        url = "http://localhost:3001/api/get-balances"
        resp = requests.get(url)

        url = "http://localhost:3001/api/spend-points"
        data = {"points": 1500}
        resp = requests.post(url, json=data)

        expected_result = {
            "err": "Not enough points"
        }
        self.assertEqual(resp.json(), expected_result)


if __name__ == '__main__':
    unittest.main()
