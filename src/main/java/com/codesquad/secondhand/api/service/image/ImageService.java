package com.codesquad.secondhand.api.service.image;

import static com.codesquad.secondhand.domain.image.ImageExtension.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.image.ImageRepository;
import com.codesquad.secondhand.exception.image.EmptyFileException;
import com.codesquad.secondhand.exception.image.ExceedMaxSizeException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ImageService {

	public static final String EXTENSION_SEPARATOR = ".";
	public static final String NAME_SEPARATOR = "-";
	public static final String DIRECTORY_SEPARATOR = "/";

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final ImageRepository imageRepository;
	private final AmazonS3Client amazonS3Client;

	@Transactional
	public Image createImage(MultipartFile file, String directory) {
		return imageRepository.save(new Image(null, upload(file, directory)));
	}

	@Transactional(readOnly = true)
	public List<Image> findImagesByIds(List<Long> imageIds) {
		if (imageIds == null || imageIds.isEmpty()) {
			return Collections.emptyList();
		}
		return Collections.unmodifiableList(imageRepository.findAllById(imageIds));
	}

	private String upload(MultipartFile multipartFile, String directory) {
		validateFileExists(multipartFile);

		String fileName =
			directory + DIRECTORY_SEPARATOR + makeNewFileName(
				Objects.requireNonNull(multipartFile.getOriginalFilename()),
				multipartFile.getContentType());
		try {
			ObjectMetadata objectMetadata = generateObjectMetadata(multipartFile);
			amazonS3Client.putObject(
				new PutObjectRequest(bucket, fileName, multipartFile.getInputStream(), objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new ExceedMaxSizeException();
		}

		return amazonS3Client.getUrl(bucket, fileName).toString();
	}

	private String makeNewFileName(String originalFileName, String contentType) {
		String extension = getImageExtension(contentType).getType();
		int lastDotIndex = originalFileName.lastIndexOf(EXTENSION_SEPARATOR);
		String baseFileName = originalFileName.substring(0, lastDotIndex);
		String now = String.valueOf(System.currentTimeMillis());

		return baseFileName + NAME_SEPARATOR + now + EXTENSION_SEPARATOR + extension;
	}

	private void validateFileExists(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			throw new EmptyFileException();
		}
	}

	private ObjectMetadata generateObjectMetadata(MultipartFile multipartFile) throws IOException {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(multipartFile.getContentType());
		objectMetadata.setContentLength(multipartFile.getInputStream().available());
		return objectMetadata;
	}

}
