import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Home() {
  const [getdata, setData] = useState(null); // State to hold API data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://otruyenapi.com/v1/api/home');
        console.log('API Response:', response.data); // Debug API response
        setData(response.data); // Set the `data` property from the API response
        setLoading(false);
      } catch (error) {
        setError(error.message); // Capture error message
        setLoading(false);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle case where `getdata` or its nested properties are missing
  const seoTitle = getdata?.data?.data?.seoOnPage?.titleHead || 'Default Title';
  const description = getdata?.data?.data?.seoOnPage?.descriptionHead || 'No description available.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <p>{description}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
