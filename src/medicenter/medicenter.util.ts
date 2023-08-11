import {ImageAnnotatorClient} from '@google-cloud/vision';
import AWS from 'aws-sdk';
import axios from 'axios';

/** Google Vision API **/
export async function callVisionAPI(imageBuffer: Buffer): Promise<any>{
  try{
    /** GCP Credentials 가져오기 **/
    const credentials: string = process.env.GCP_CREDENTIALS;
    console.log("typeof credentials", typeof credentials);
    console.log("credentials", credentials);

    /** GCP Client connect **/
    const client = new ImageAnnotatorClient({
      endpoint: 'asia-northeast3-vision.googleapis.com',
      credentials: JSON.parse(credentials) // 키 파일 경로
    });

    /** call vision api **/
    const [result] = await client.textDetection(imageBuffer);

    /** textAnnotations 값이 없다면 오류처리 **/
    if(!result.textAnnotations || (result.textAnnotations && result.textAnnotations.length === 0)){
      return {
        message: 'Text could not be verified.'
      };
    }
    const detections = result.textAnnotations;
    return {
      text: detections[0].description
    };
  }catch (e) {
    console.log("Error in callVisionAPI", e);
    return e;
  }
}

/** 영수증 사진인지 확인 **/
export async function isReceipt(imageBuffer: Buffer): Promise<boolean>{
  try{
    const rekognition = new AWS.Rekognition();
    const params = {
      Image: {
        Bytes: imageBuffer
      }
    };

    const detectLabels = await rekognition.detectLabels(params).promise();
    const labelDetections = detectLabels.Labels;
    console.log("labelDetections in isReceipt", labelDetections);

    const receipts = labelDetections.filter(detection => detection.Confidence >= 80 && detection.Name.toLowerCase().includes('receipt'));
    if (receipts.length > 0) {
      console.log('There is a receipt in the image.');
      return true;
    } else {
      console.log('There is no receipt in the image.');
      return false;
    }
  }catch (e) {
    console.log("Error in isReceipt", e);
    return false;
  }
}

/** GPT API 주소 추출 -> 사용하지 않음 **/
export async function addressExtractByGPT(text: string): Promise<any>{
  try{
    const GPT_API_KEY: string = process.env.GPT_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `Extract the address from the following text:\n${text}`,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GPT_API_KEY}`,
        },
      }
    );

    console.log("addressExtractByGPT response", response.data);
    if(!response.data || (response.data && !response.data.choices) || (response.data && response.data.choices && response.data.choices.length === 0)) {
      console.log("Not exist response.data.choices");
      return false;
    }

    return response.data.choices[0].text.trim();
  }catch (e) {
    console.log("Error in addressExtract", e);
    return false;
  }
}

/** URL을 Buffer 데이터로 변환 **/
export async function imageUrlToBuffer(imageUrl): Promise<Buffer> {
  try {
    const prodBucket = 'petnmat-prod';
    const devBucket = 'petnmat-dev';
    const bucket = imageUrl.includes(prodBucket) ? prodBucket : devBucket;

    const key = imageUrl.split('amazonaws.com/')[1];
    const params = {
      Bucket: bucket,
      Key: key
    }

    const s3: AWS.S3 = new AWS.S3({
      region: 'ap-northeast-2' // S3 버킷의 리전에 맞게 수정
    });

    const imageFile = await s3.getObject(params).promise();
    return imageFile.Body ? imageFile.Body as Buffer : null;
  } catch (error) {
    console.log('Error in imageUrlToBuffer:', error);
    return null;
  }
}

interface Hospital {
  reviewCount: number;
  totalRate: number;
  rate: number
}
export function getAverage(count: number, totalRate: number, reviewRate: number): Hospital{
  if(count) count++;
  else count = 1;

  if(totalRate) totalRate = totalRate + reviewRate;
  else totalRate = reviewRate;

  return { reviewCount: count, totalRate: totalRate, rate: Number((totalRate / count).toFixed(2)) };
}

